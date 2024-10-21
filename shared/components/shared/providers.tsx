'use client'

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const Providers = ({ children, session }: PropsWithChildren & any)  => {
  return (
    <SessionProvider session={session}>
        <NextTopLoader />
      {/* <NextTopLoader 
       color="hsl(var(--secondary-light))"
       initialPosition={0.08}
       crawlSpeed={200}
       height={3}
       crawl
       showSpinner
       easing="ease"
       speed={200}
       shadow="0 0 10px hsl(var(--secondary)),0 0 5px hsl(var(--secondary-light))"
       template='<div class="bar" role="bar"><div class="peg"></div></div> 
<div class="spinner" style="top: 65px" role="spinner"><div class="spinner-icon"></div></div>'
       zIndex={999999}
      /> */}
      {children}
      <Toaster />
    </SessionProvider>
  );
};
