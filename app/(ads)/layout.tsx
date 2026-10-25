import { GoogleAnalytics } from "@next/third-parties/google";

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-7NWN88S932" />
      <meta
        name="google-adsense-account"
        content="ca-pub-7781201150025077"
      ></meta>
      {/*<script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7781201150025077"
        crossOrigin="anonymous"
      ></script>*/}

      {children}
    </>
  );
}
