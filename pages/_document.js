import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="overflow-x-hidden">
      <Head>
        <title>माझाNagpur</title>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
        <meta name="description" content="Codeswear.com - Wear the code" />
        {/* Add other meta tags, links, or scripts here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>

  );
}
