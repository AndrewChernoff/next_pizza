import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

export const useServerSession = async () => {
  const session = await getServerSession();

 

  return session
};
