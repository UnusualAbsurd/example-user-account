import "../styles/globals.css";
import "../styles/Home.module.scss";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { NotificationContainer } from "react-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Example SignUp and Login"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://img-9gag-fun.9cache.com/photo/a3Q5VW5_460s.jpg",
          },
        ]}
      />
      <NotificationContainer />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
