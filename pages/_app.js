import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import PageLoading from "src/components/PageLodaing";
import { queryClient } from "src/libs/react-query";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ConfigProvider csp={{ nonce: "123456" }}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <PageLoading />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default MyApp;
