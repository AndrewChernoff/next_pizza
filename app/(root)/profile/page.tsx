"use client";

import { getUserSession } from "@/shared/lib/get-user-session";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  /*  const  session  = await getUserSession();

  if (!session) {
    redirect("/not-auth");
  } */

  const session = useSession();
  if (!session) {
    redirect("/not-auth");
  }
  return <div>Profile</div>;
}
