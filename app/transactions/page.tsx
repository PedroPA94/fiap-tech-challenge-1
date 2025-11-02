"use client";

import { SidebarMenu } from "../components/SidebarMenu";
import { useTransactions } from "../lib/hooks/useTransactions";
import { useUser } from "../providers/UserProvider";
import { useMemo } from "react";
import { TransactionItemProps } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";
import { TransactionsCard } from "./components/TransactionsCard";

export default function Transactions() {
  const { user } = useUser();
  const { transactions, refreshTransactions } = useTransactions(user);

  const transactionsForList = useMemo<TransactionItemProps[]>(() => {
    if (!transactions) return [];
    return transactions.map((t) => ({
      id: t.id,
      amount: t.value,
      label: t.type,
      date: t.timestamp.substring(0, 10),
    }));
  }, [transactions]);

  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <main
        className={`d-flex justify-content-center align-items-start w-100 h-100 gap-lg-5`}
        style={{ maxWidth: "1200px" }}
      >
        <SidebarMenu />
        <TransactionsCard
          user={user}
          transactions={transactionsForList}
          refreshTransactions={refreshTransactions}
        />
      </main>
    </div>
  );
}
