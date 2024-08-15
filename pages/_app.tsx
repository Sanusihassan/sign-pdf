import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import "../index.scss";
// redux store
import { Provider as ReduxProvider } from "react-redux";
// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "../src/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

function MyApp({ Component, pageProps, lang }: AppProps & { lang: string }) {
  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-NY5F91MF0B`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  
      gtag('config', 'G-NY5F91MF0B');
    `,
          }}
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <ReduxProvider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} lang={lang} />
        </DndProvider>
      </ReduxProvider>
    </>
  );
}
MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<{
  pageProps: Record<string, unknown>;
  lang: string;
}> => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const path = ctx.asPath || "";
  const lang = path.split("/")[1] || ""; // default to English if language code cannot be extracted

  return { pageProps, lang };
};

export default MyApp;
