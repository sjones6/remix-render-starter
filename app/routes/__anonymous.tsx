import { json, useLoaderData, Outlet, LoaderFunction, useNavigate, Link } from "remix";
import { SafeUser } from "~/utils/auth";
import { getUser } from "~/utils/session.server";

type SessionData = {
  user: SafeUser | null
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

// https://remix.run/docs/en/v1/api/conventions#route-filenames
export default function Anonymous()  {
  const navigate = useNavigate();
  const { user } = useLoaderData<SessionData>();

  if (user) {
    navigate('/app/home');
    return null;
  }

  return <>
    <Header />
    <div className="pt-16">
      <Outlet />
    </div>
  </>
}

function Header(): JSX.Element {
  return <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content w-full fixed top-0 left-0 z-10">
    <div className="flex-1 px-2 mx-2">
      <Link to="/" prefetch="intent" className="text-lg font-bold">
          Remix/Render
      </Link>
    </div>
    <div className="flex-none hidden px-2 mx-2 lg:flex">
      <div className="flex items-stretch">
        <Link to='/login' prefetch="intent" className="btn btn-ghost btn-sm rounded-btn">
          Login
        </Link>
        <Link to='/register' prefetch="intent" className="btn btn-secondary btn-sm rounded-btn">
          Sign up
        </Link>
      </div>
    </div>
  </div>
}