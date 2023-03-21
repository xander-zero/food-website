import ShopLayout from "src/layout/ShopLayout";
import { Categories } from "src/template/Categories";
import { fetchProducts } from "src/service/shop/product-endpoint";

export default function CategoriesPage({ data }) {
  return <Categories data={data} />;
}

CategoriesPage.getLayout = function (page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export async function getServerSideProps(context) {
  const { data } = await fetchProducts();
  return {
    props: {
      data,
    },
  };
}
