import { ReactNode } from "react";

export default function DashBoardLayout({children} : {children: ReactNode}) {
    return (
        <html lang="en">
            Dashboard Header
            <body>{children}</body>
        </html>
    )
}