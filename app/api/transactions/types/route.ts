import { NextResponse } from "next/server";

const transactionTypes = ["Depósito", "Transferência", "Saque", "Pagamento"];

export async function GET() {
  return NextResponse.json(transactionTypes);
}
