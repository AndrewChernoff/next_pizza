"use client";

import { Container } from "./container";
import Image from "next/image";
import { Button } from "@/shared/components/ui";
import { MoveRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { cn } from "@/shared/lib/utils";
import { CartButton } from "./cart-button";
import { useSession, signIn, signOut } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { useState } from "react";
import { AuthModal } from "./modals/auth-modals/auth-modal";

type PropsType = {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
};

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: PropsType) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false)

  const onSignInProvider = (provider: 'github' | 'google') =>
    signIn(provider, {
      callbackUrl: "/",
      redirect: true,
  });

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex itmes-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black"> Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <ProfileButton session={session} onOpenClick={() => setOpen(true)}/* onSignInClick={onSignInClick} *//>

          {hasCart && <CartButton />}
        </div>

        <AuthModal open={open} onClose={() => setOpen(false)} onSignInProvider={onSignInProvider}/>
      </Container>
    </header>
  );
};
