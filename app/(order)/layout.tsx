import { Header } from "@/shared/components/shared";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="min-h-screen bg-[#F4F1EE]">
        <Header className="border-grey-200" hasSearch={false} hasCart={false}/>
        {children}
      </main>
  );
}
