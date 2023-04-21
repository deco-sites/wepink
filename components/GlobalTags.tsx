import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Tailwind v3 CSS file */}
      <link href={asset("/main.css")} rel="stylesheet" />

      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#221E1F" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/montserrat-v25-latin-regular.woff2")
          }) format('woff2');
          }
          @font-face {
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/montserrat-v25-latin-regular.woff")
          }) format('woff');
          }
          @font-face {
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${
            asset("/fonts/montserrat-v25-latin-700.woff2")
          }) format('woff2');
          }
          @font-face {
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${
            asset("/fonts/montserrat-v25-latin-700.woff")
          }) format('woff');
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
