import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { EventsProvider } from "../contexts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  );
}
