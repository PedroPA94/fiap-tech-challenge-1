import "./globals.scss";

import { Header } from "@/design-system/components";
import { Inter } from "next/font/google";

import { getUser } from "./lib/getUser";
import { UserProvider } from "./UserProvider";

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
      <body>
        <UserProvider initialUser={user}>
          <Header
            showIcon
            username={`${user.firstname} ${user.lastname}`}
            navigationItems={[
              { content: "Início", link: "/" },
              { content: "Transações", link: "" },
            ]}
          />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
