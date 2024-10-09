import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { findPizzas, SearchParamsType } from "@/shared/lib/findPizzas";

export default async function Home({searchParams}: {searchParams: SearchParamsType}) {
  
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/*Filtration*/}
          <div className="w-[250px]">
          <Suspense>
            <Filters />
          </Suspense>
          </div>

          {/*Product's list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (el) =>
                  el.products.length > 0 && (
                    <ProductsGroupList
                      key={el.id}
                      title={el.name}
                      categoryId={el.id}
                      items={el.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
