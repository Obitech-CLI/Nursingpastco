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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          <SuccessModalProvider>
            <ErrorModalProvider>
              <ConfirmModalProvider>
                <MenuProvider>
                  <SearchProvider>
                    <Header />
                    {children}
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
