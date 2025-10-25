import { Header } from "@/design-system/components";
import "./globals.css";

import { getUser } from "./lib/getUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="pt-br">
      <head></head>
      <body>
        <Header showIcon username={`${user.firstname} ${user.lastname}`} />
        {children}
      </body>
    </html>
  );
}
