import { PanelLayout } from "src/layout/PanelLayout";

export default function Products() {
  return <div>Hello Product Page</div>;
}

Products.getLayout = function (page) {
  return <PanelLayout>{page}</PanelLayout>;
};
