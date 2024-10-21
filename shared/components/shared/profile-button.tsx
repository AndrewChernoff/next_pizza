import { CircleUser, User } from "lucide-react";
import { Button } from "../ui";
import { Session } from "next-auth";
import Link from "next/link";

type PropsType = {
  session: Session | null;
  onOpenClick: VoidFunction;
};

export const ProfileButton = ({ session, onOpenClick }: PropsType) => {
  return (
    <>
      {!session ? (
        <Button
          onClick={onOpenClick}
          variant={"outline"}
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href={"profile"}>
          <Button variant={"outline"} className="flex items-center gap-1">
            <CircleUser size={16} />
            Профиль
          </Button>
        </Link>
      )}
    </>
  );
};
