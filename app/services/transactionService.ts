import { Transaction } from "../lib/interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function createTransaction(data: Transaction) {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: data.type,
      value: Number(data.value),
      timestamp: data.timestamp,
      userId: data.userId,
    }),
  });

  if (!res.ok) throw new Error("Falha ao criar transação");
}

export async function updateTransaction(data: Transaction) {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: data.id,
      type: data.type,
      value: Number(data.value),
      timestamp: data.timestamp,
    }),
  });

  if (!res.ok) throw new Error("Falha ao atualizar transação");
}

export async function deleteTransaction(id: string) {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) throw new Error("Falha ao excluir transação");
}
