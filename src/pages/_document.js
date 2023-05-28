import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the Hotjar tracking code here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              <!-- Hotjar Tracking Code -->
              <script>
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3312000,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              </script>
              `
            }}
          />
          {/* End of Hotjar tracking code */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
