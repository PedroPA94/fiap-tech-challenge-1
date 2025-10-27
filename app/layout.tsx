import "./globals.scss";

import { Header } from "@/design-system/components";
import { Inter } from "next/font/google";

import { getUser } from "./lib/getUser";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="pt-br" className={inter.variable}>
      <head></head>
      <body>
        <Header showIcon username={`${user.firstname} ${user.lastname}`} />
        {children}
      </body>
    </html>
  );
}
