import { useServerSession } from "@/shared/lib";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const  session  = await useServerSession();

  if (!session) {
    redirect("/not-auth");
  }
  return <div>Profile</div>;
}
