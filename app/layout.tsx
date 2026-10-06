import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Socials } from "./components/Socials";
import { MenuProvider } from "./contexts/menuContext";
import {
  ConfirmModalProvider,
  ErrorModalProvider,
  SuccessModalProvider,
} from "./contexts/modalContexts";
import { SearchProvider } from "./contexts/searchContext";
import { AppThemeProvider } from "./contexts/themeContext";
import "./globals.css";
import { ConfirmModal, ErrorModal, SuccessModal } from "./ui/FeedbackModal";
import { MenuModal } from "./ui/MenuModal";
import { SearchModal } from "./ui/SearchModal";
import {
  Poppins,
  Playfair,
  Merriweather,
  Montserrat,
  Raleway,
} from "next/font/google";
import { Vibration } from "./ui/Vibrate";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} 
        ${merriweather.variable} ${raleway.variable} ${montserrat.variable}`}
      >
        <AppThemeProvider>
          <SuccessModalProvider>
            <ErrorModalProvider>
              <ConfirmModalProvider>
                <MenuProvider>
                  <SearchProvider>
                    <Header />
                    {children}
                    <Vibration />
                    <SearchModal />
                    <MenuModal />
                    <SuccessModal />
                    <ErrorModal />
                    <ConfirmModal />
                    <Socials />
                    <Footer />
                  </SearchProvider>
                </MenuProvider>
              </ConfirmModalProvider>
            </ErrorModalProvider>
          </SuccessModalProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
