import ShopLayout from "src/layout/shopLayout";
import { Home } from "src/template/shop";

export default function ShopPage() {
  return <Home />;
}

ShopPage.getLayout = function (page) {
  return <ShopLayout>{page}</ShopLayout>;
};
