/**
 * this is my _document.tsx file 
 * i have a showSignModal on my redux store depending on that boolean value if it's true then i want to set the css overflow property to body to hidden otherwise initial
 */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
// import { isrtllang } from "../src/utils";

const MyDocument = ({ lang }: { lang: string }) => {
  // let isRtl = isrtllang(lang);
  return (
    <Html
      lang={lang.length > 0 ? lang : "en"}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <Head>
        <meta name="theme-color" content="#FC271C" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />


        {/* Cedarville Cursive */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap" rel="stylesheet" />

        {/* Arizonia */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Arizonia&family=Cedarville+Cursive&display=swap" rel="stylesheet" />

        {/* Lobster */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Arizonia&family=Cedarville+Cursive&family=Lobster&display=swap" rel="stylesheet" />

        {/* Rouge Script */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Arizonia&family=Cedarville+Cursive&family=Lobster&family=Rouge+Script&display=swap" rel="stylesheet" />


        {/* Alex Brush */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Arizonia&family=Cedarville+Cursive&family=Lobster&family=Rouge+Script&display=swap" rel="stylesheet" />

        {/* Sacramento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Arizonia&family=Cedarville+Cursive&family=Lobster&family=Rouge+Script&family=Sacramento&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateBodyOverflow() {
                const showSignModal = window.__NEXT_DATA__.props.pageProps.initialReduxState.showSignModal;
                document.body.style.overflow = showSignModal ? 'hidden' : 'initial';
              }
              
              if (typeof window !== 'undefined') {
                updateBodyOverflow();
                window.addEventListener('redux-state-change', updateBodyOverflow);
              }
            })();
          `
        }} />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  const path = ctx.asPath;
  let lang = "en"; // default language
  if (path && path.startsWith("/ar")) {
    lang = "ar";
  } else if (path && path.startsWith("/es")) {
    lang = "es";
  } else if (path && path.startsWith("/fr")) {
    lang = "fr";
  } else if (path && path.startsWith("/hi")) {
    lang = "hi";
  } else if (path && path.startsWith("/zh")) {
    lang = "zh";
  }
  return {
    ...initialProps,
    lang,
  };
};

export default MyDocument;
