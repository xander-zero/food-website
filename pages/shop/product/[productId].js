import { useRouter } from "next/router";
import ShopLayout from "src/layout/shopLayout";
import { ProductDetail } from "src/template/ProductDetail";
import { fetchProductDetail } from "src/service/shop/product-endpoint";
import { fetchProducts } from "src/service/shop/product-endpoint";
import { Spin } from "antd";

export default function ProductDetailPage({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    <Spin spinning={true} />;
  }

  return <ProductDetail data={data} />;
}

ProductDetailPage.getLayout = function (page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export async function getStaticPaths() {
  const { data: response } = await fetchProducts();
  const data = response.slice(0, 10);
  const paths = data.map((itm) => ({
    params: { productId: itm.id.toString() },
  }));

  console.log("paths", paths);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await fetchProductDetail(params.productId);
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
