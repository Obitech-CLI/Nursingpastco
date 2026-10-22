import { GoogleAnalytics } from "@next/third-parties/google";

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-7NWN88S932" />
      <script
        id="adsense-script"
        async
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7781201150025077"
      />
      {children}
    </>
  );
}
