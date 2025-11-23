import { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer, InquiryPopup, BackToTop } from "@/src/Components";
import "../../public/Assets/scss/globals.scss";
import "react-phone-number-input/style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <InquiryPopup />
      <BackToTop />
    </div>
  );
}
