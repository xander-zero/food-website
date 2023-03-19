import { ProductCard } from "src/components/ProductCard";

export function Product({ data }) {
  return (
    <div className=" container mx-auto my-[50px]">
      <h2 className="text-xl">Products</h2>
      <div className="flex items-center justify-between flex-wrap">
        {data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
