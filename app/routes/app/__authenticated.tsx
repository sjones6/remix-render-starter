import { json, useLoaderData, Outlet, LoaderFunction, useNavigate } from "remix";
import { SafeUser, UserContext } from "~/utils/auth";
import { getUser } from "~/utils/session.server";

type SessionData = {
  user: SafeUser | null
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

// https://remix.run/docs/en/v1/api/conventions#route-filenames
export default function Authenticated()  {
  const navigate = useNavigate();
  const { user } = useLoaderData<SessionData>();

  if (!user) {
    navigate('/login');
    return null;
  }

  return <UserContext.Provider value={{ user }}>
    <Header user={user} />
    <Outlet />
  </UserContext.Provider>
}

function Header({ user}: { user: SafeUser}): JSX.Element {
  return <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content w-full fixed top-0 left-0 z-10">
    <div className="flex-1 px-2 mx-2">
      <span className="text-lg font-bold">
        Remix/Render
      </span>
    </div>
    <div className="flex-none hidden px-2 mx-2 lg:flex">
      <div className="flex items-stretch">
        {user && <a href='/logout' className="btn btn-ghost btn-sm rounded-btn">
          Logout
        </a>}
      </div>
    </div>
  </div>
}