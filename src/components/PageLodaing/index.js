import { useEffect, useState } from "react";
import Router from "next/router";

export default function PageLoading() {
  const [pageLoading, setPageLoading] = useState(false);

  const loading = pageLoading;

  useEffect(() => {
    const handleStart = (url, { shallow }) => {
      if (url !== Router.asPath && !shallow) setPageLoading(true);
    };
    const handleComplete = () => setTimeout(() => setPageLoading(false), 0);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <div
        style={{
          opacity: +pageLoading,
          overflow: "hidden",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(7px)",
          position: "absolute",
          zIndex: 10,
          transition: "all .25s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: !pageLoading && "none",
          color: "rgba(42,142,255,0.65)",
        }}
      />

      <div
        style={{
          height: "3px",
          width: loading ? "100%" : "0",
          background: "var(--main-color)",
          transition:
            "width 4s cubic-bezier(0.65, 0, 0.35, 1)," +
            " top .15s ease .2s, opacity .15s ease",
          position: "fixed",
          top: loading ? 0 : "-5px",
          left: 0,
          zIndex: 100001,
        }}
      >
        <div
          className={
            "absolute -right-0.5 -top-1.5 h-1 w-4" +
            " overflow-visible bg-transparent transition-shadow"
          }
          style={{
            boxShadow: loading
              ? "0px 0 10px 3px rgba(42,142,255,0.75)"
              : "none",
          }}
        />
      </div>
      <div
        style={{
          height: "3px",
          width: loading ? 0 : "100%",
          background: "var(--main-color)",
          transition: "width .2s ease, top .15s ease .2s",
          position: "fixed",
          top: loading ? 0 : "-5px",
          left: 0,
          zIndex: 100002,
        }}
      />
    </>
  );
}
