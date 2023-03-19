import { ConfigProvider } from "antd";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ConfigProvider csp={{ nonce: "123456" }}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
