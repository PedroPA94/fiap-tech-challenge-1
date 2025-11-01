import { NextResponse } from "next/server";

const accountsInfo = [
  {
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
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
