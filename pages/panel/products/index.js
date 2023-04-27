import { PanelLayout } from "src/layout/PanelLayout";
import { ProductTable } from "src/template/Product/ProductTable";

export default function Products() {
  return <ProductTable />;
}

Products.getLayout = function (page) {
  return <PanelLayout>{page}</PanelLayout>;
};
