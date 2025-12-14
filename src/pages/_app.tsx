import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {
  Navbar,
  Footer,
  InquiryPopup,
  BackToTop,
  WhatsAppButton,
} from "@/src/Components";
import "../../public/Assets/scss/globals.scss";
import "react-phone-number-input/style.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <InquiryPopup />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
