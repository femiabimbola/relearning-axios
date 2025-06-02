

import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";

export const metadata: Metadata = {
  title: "Working with Axios",
  description: "Designed by Femi Abimbola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex justify-center items-center h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
