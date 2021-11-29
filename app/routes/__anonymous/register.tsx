import { User } from "@prisma/client";
import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import {
  useActionData,
  Link,
  useSearchParams,
  redirect,
  json,
  useNavigate
} from "remix";
import { createUserSession, getUser, register } from "~/utils/session.server";
import { db } from "~/utils/db.server";

type LoginData = {
  user: User | null
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  if (user) {
    return redirect('/');
  }

  const data: LoginData = {
    user
  };
  return json(data);
};

export let action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  let form = await request.formData();
  let username = form.get("username");
  let password = form.get("password");
  let redirectTo = form.get("redirectTo");
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { username, password };
  let fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  let userExists = await db.user.findFirst({
    where: { username }
  });
  if (userExists) {
    return {
      fields,
      formError: `User with username ${username} already exists`
    };
  }
  const user = await register({ username, password });
  if (!user) {
    return {
      fields,
      formError: `Something went wrong trying to create a new user.`
    };
  }
  return createUserSession(user.id, redirectTo);
};

export default function Login() {
  const navigate = useNavigate();
  let actionData = useActionData<ActionData | undefined>();
  let [searchParams] = useSearchParams();
  let data = useLoaderData<LoginData>();

  if (data.user) {
    navigate('/login');
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto card card-side bordered shadow">
      <div className="card-body" data-light="">
        <h1 className="card-title">Register</h1>
        <Form
          method="post"
          className=""
          aria-describedby={
            actionData?.formError
              ? "form-error-message"
              : undefined
          }
        >
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get("redirectTo") ?? undefined
            }
          />
          <div className="form-control">
            <label className="label" htmlFor="username-input">Username</label>
            <input
              className={`input input-bordered ${actionData?.fieldErrors?.username ? 'input-error' : ''}`}
              type="text"
              id="username-input"
              name="username"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(
                actionData?.fieldErrors?.username
              )}
              aria-describedby={
                actionData?.fieldErrors?.username
                  ? "username-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p
                className="label-text-alt text-red-500"
                role="alert"
                id="username-error"
              >
                {actionData?.fieldErrors.username}
              </p>
            ) : null}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password-input">Password</label>
            <input
              className={`input input-bordered ${actionData?.fieldErrors?.password ? 'input-error' : ''}`}
              id="password-input"
              name="password"
              defaultValue={actionData?.fields?.password}
              type="password"
              aria-invalid={
                Boolean(
                  actionData?.fieldErrors?.password
                ) || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.password
                  ? "password-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="label-text-alt text-red-500"
                role="alert"
                id="password-error"
              >
                {actionData?.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div>
            {actionData?.formError ? (
              <p
                className="label-text-alt text-red-500"
                role="alert"
              >
                {actionData?.formError}
              </p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Create account
          </button>
        </Form>
        <div className="mt-2">
          Already have an account? <Link prefetch="intent" className="link link-primary" to="/login">Login</Link>.
        </div>
      </div>
    </div>
  );
}