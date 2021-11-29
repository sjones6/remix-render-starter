import { User } from ".prisma/client";
import { createContext, useContext } from "react";

export type SafeUser = Omit<User, 'passwordHash'>;

const UserContext = createContext<{
  user: SafeUser | null
}>({
  user: null
});
UserContext.displayName = 'UserContext';

export { UserContext }

export const useUser = (): SafeUser | null => {
  const { user } = useContext(UserContext);
  return user;
}

export const useIsAuthenticated = (): boolean => {
  const user = useUser();
  return !!user;
}