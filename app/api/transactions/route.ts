import { NextResponse } from "next/server";

let transactions = [
  {
    id: "993a5534-26eb-4654-8bae-86420b91a402",
    type: "Depósito",
    value: 2500,
    timestamp: "2025-07-10T14:51:33",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "ca4fb3c9-0f87-4f00-996c-102f8eb85491",
    type: "Transferência",
    value: -110,
    timestamp: "2025-07-10T16:53:22",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "8276a71f-7f38-4e27-89e1-e2fa4a5325c4",
    type: "Depósito",
    value: 543,
    timestamp: "2025-07-23T09:12:33",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "97f1b69d-525b-4831-9caa-2734bc2df731",
    type: "Transferência",
    value: -1000,
    timestamp: "2025-07-25T14:30:41",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "660c51a3-ac0c-4a2c-b87a-1be201ef18ba",
    type: "Depósito",
    value: 40,
    timestamp: "2025-08-20T10:11:56",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "3c29e94f-30f3-4202-b330-301a8da1004e",
    type: "Depósito",
    value: 120,
    timestamp: "2025-09-23T19:55:12",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "83717a7b-a415-4460-bac3-7823e54325bc",
    type: "Transferência",
    value: -86,
    timestamp: "2025-08-27T17:31:13",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "2706d9e4-9958-48cc-8b56-8866da0cad4a",
    type: "Transferência",
    value: -56,
    timestamp: "2025-09-02T14:51:33",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
  {
    id: "405d3356-9a60-4b3c-bba6-41ef9a21eeeb",
    type: "Transferência",
    value: -36,
    timestamp: "2025-09-04T12:44:32",
    userId: "120bfc22-1421-4720-adda-17954f5433c6",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const data = userId
    ? transactions.filter((t) => t.userId === userId)
    : transactions;

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { type, value, userId } = await request.json();

  if (!type || typeof value !== "number" || !userId) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const newTransaction = {
    id: crypto.randomUUID(),
    type,
    value,
    timestamp: new Date().toISOString().slice(0, 19),
    userId,
  };

  transactions.push(newTransaction);
  return NextResponse.json(newTransaction, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  transactions = transactions.map((t) => (t.id === id ? { ...t, ...data } : t));
  return new NextResponse(null, { status: 204 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  transactions = transactions.filter((t) => t.id !== id);
  return new NextResponse(null, { status: 204 });
}
