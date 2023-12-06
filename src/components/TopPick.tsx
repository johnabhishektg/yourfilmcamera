import ProductItems from "./ProductItems";

const TopPick = (products: any) => {
  let topPickArray = [];
  for (let i = 0; i < 4; i++) {
    topPickArray.push({
      id: products[i].id,
      category: products[i]?.category || "cameras",
      images: products[i]?.images,
      name: products[i].name,
      new: products[i].new,
      description: products[i].description,
      price: products[i].price,
      createdAt: null,
    });
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center lg:gap-16 sm:mt-2">
      {topPickArray?.map((product) => (
        <ProductItems key={product.id} {...product} />
      ))}
    </div>
  );
};

export default TopPick;
