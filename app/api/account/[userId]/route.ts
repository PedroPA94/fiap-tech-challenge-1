import { NextResponse } from "next/server";

const accountsInfo = [
  {
    userId: "993a5534-26eb-4654-8bae-86420b91a402",
    balance: 2500,
    firstname: "Joana",
    lastname: "da Silva Oliveira",
    password: "teste123",
    email: "teste@teste.com",
  },
];

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const account = accountsInfo.find((acc) => acc.userId === userId);

  if (!account) {
    return NextResponse.json(
      { error: "Conta não encontrada" },
      { status: 404 }
    );
  }

  const { password, ...accountData } = account;

  return NextResponse.json({
    ...accountData,
  });
}
