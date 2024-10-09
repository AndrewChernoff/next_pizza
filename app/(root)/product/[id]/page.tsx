import { Container, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { PizzaImageImage } from "@/shared/components/shared/pizza-image";
import { ProductPageForm } from "@/shared/components/shared/product-page-form";

export default async function ProductPage({//Page
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ 
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true
            }
          }
        }
      },
      items: true,
    }, 
  });




  if (!product) {
    notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductPageForm product={product}/>
        {/* <PizzaImageImage imgUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur
          </p>

          <GroupVariants
            items={[
              {
                name: "small",
                value: "1",
              },
              {
                name: "medium",
                value: "2",
              },
              {
                name: "large",
                value: "3",
                disabled: true,
              },
            ]}
          />
        </div> */}
      </div>
    </Container>
  );
}
