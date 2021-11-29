import { json, useLoaderData, Outlet, LoaderFunction, useNavigate } from "remix";
import { SafeUser } from "~/utils/auth";
import { getUser } from "~/utils/session.server";

type SessionData = {
  user: SafeUser | null
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export default function Anonymous()  {
  const navigate = useNavigate();
  const { user } = useLoaderData<SessionData>();

  if (user) {
    navigate('/home');
    return null;
  }

  return <>
    <Header  />
    <Outlet />
  </>
}

function Header(): JSX.Element {
  return <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div className="flex-1 px-2 mx-2">
      <span className="text-lg font-bold">
        Remix/Render
      </span>
    </div>
    <div className="flex-none hidden px-2 mx-2 lg:flex">
      <div className="flex items-stretch">
        <a href='/login' className="btn btn-ghost btn-sm rounded-btn">
          Login
        </a>
      </div>
    </div>
  </div>
}