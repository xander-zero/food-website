import { ConfigProvider } from "antd";
import PageLoading from "src/components/PageLodaing";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ConfigProvider csp={{ nonce: "123456" }}>
      <Component {...pageProps} />
      <PageLoading />
    </ConfigProvider>
  );
}

export default MyApp;
