import { useUser } from "@/providers/user-context";

export const useCurrentUser = () => {
  const context = useUser();

  return context?.state?.userInfo?.user;
};
