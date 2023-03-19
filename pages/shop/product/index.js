import ShopLayout from "src/layout/shopLayout";
import { Product } from "src/template/Product";
import { fetchProducts } from "src/service/shop/product-endpoint";

export default function ProductPage({ data }) {
  return <Product data={data} />;
}

ProductPage.getLayout = function (page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export async function getStaticProps() {
  const { data } = await fetchProducts();
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
