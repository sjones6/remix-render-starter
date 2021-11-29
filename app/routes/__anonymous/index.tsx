import { MetaFunction, LoaderFunction, Link } from "remix";
import { redirect, useLoaderData, json, useNavigate } from "remix";
import { User } from "@prisma/client";
import { getUser } from "../../utils/session.server";

type IndexData = {
  user: User | null
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);

  if (user) {
    return redirect('/app/home');
  }

  const data: IndexData = {
    user
  };
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix/Render Starter",
    description: "Welcome to remix-render starter!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const navigate = useNavigate();
  let data = useLoaderData<IndexData>();

  if (data.user) {
    navigate('/app/home');
    return null;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Hello there
          </h1>
          <p className="mb-5">
            This is a starter app using Remix, deployed to Render.
          </p>
          <Link prefetch="intent" to="/register" className="btn btn-primary">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
