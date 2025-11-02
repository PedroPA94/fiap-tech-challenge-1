import "./globals.scss";

import { Header } from "@/design-system/components";
import { Inter } from "next/font/google";

import { getUser } from "./lib/getUser";
import { UserProvider } from "./providers/UserProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import { TransactionTypesProvider } from "./providers/TransactionTypesProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bytebank",
  description: "Liberdade e controle da sua vida financeira",
  icons: {
    icon: "/favicon.svg",
  },
};

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
          <LoadingProvider>
            <TransactionTypesProvider>
              <Header
                showIcon
                username={`${user.firstname} ${user.lastname}`}
                navigationItems={[
                  { content: "Início", link: "/" },
                  { content: "Transações", link: "/transactions" },
                ]}
              />
              {children}
            </TransactionTypesProvider>
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
