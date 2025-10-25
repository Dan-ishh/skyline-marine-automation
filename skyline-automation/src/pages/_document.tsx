import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Skyline Marine Automation - Your trusted source for high-quality marine engines, automation systems, and equipment"
        />
        <link rel="icon" href="/skyline-favicon.svg" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/skyline-favicon.svg"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" href="/skyline-favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
