import { MetaFunction } from "remix";
import { useUser } from "../../../utils/auth";

export let meta: MetaFunction = () => {
  return {
    title: "Remix/Render Starter",
    description: "Welcome to remix-render starter!"
  };
};

export default function Index() {
  const user = useUser()!;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome, {user.username}!
          </h1>
          <p className="mb-5">
            You made it!
          </p>
        </div>
      </div>
    </div>
  );
}
