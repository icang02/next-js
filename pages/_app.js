import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NextNProgress from "nextjs-progressbar"
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return (
    <>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={0} height={3} showOnShallow={false} />
      <Component {...pageProps} />;
    </>
  );
}
