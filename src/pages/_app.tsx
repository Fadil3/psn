import { PrimeReactProvider } from "primereact/api";

import "../styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}