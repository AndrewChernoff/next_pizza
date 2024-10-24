
import { FormInput } from "@/shared/components/shared/form-components";
import { ProfileForm } from "@/shared/components/shared/profile-form";
import { getSession } from "@/shared/constants/auth";
import { getUserSession } from "@/shared/lib/get-user-session";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  /*  const  session  = await getUserSession();

  if (!session) {
    redirect("/not-auth");
  } */

    const session = await getSession()


  //const session = useSession();
  if (!session) {
    redirect("/not-auth");
  }
  return <ProfileForm data={session.user as User}/>;
}
