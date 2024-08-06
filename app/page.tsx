import {
  Categories,
  Container,
  Filters,
  ProductsCard,
  ProductsGroupList,
  SortPopup,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/*Filtration*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Product's list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-птцца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Чизбургер-dsg",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 50,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Чизбургер-gews",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 950 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-птцца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Чизбургер-dsg",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 50,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Чизбургер-gews",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 950 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Закуски"
                categoryId={3}
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-птцца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Чизбургер-dsg",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 50,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "Чизбургер-gews",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif",
                    price: 550,
                    items: [{ price: 950 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
