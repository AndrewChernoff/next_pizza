import { Container, Title } from "@/components/shared";
import { ProductImage } from "@/components/shared/product-image";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imgUrl={product.imageUrl} size={40}/>

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1"/>

          <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur</p>
        </div>
      </div>
    </Container>
  );
}
