"use client";

import styles from "./page.module.css";
import { useUser } from "./UserProvider";
import { useTransactions } from "./lib/hooks/useTransactions";
import { SidebarMenu } from "./components/SidebarMenu";
import { BalanceCard } from "./components/BalanceCard";
import { NewTransactionCard } from "./components/NewTransactionCard";
import { TransactionHistory } from "./components/TransactionHistory";
import { SidebarTransactionHistory } from "./components/SidebarTransactionHistory";

export default function Home() {
  const { user } = useUser();
  const { transactions, balance, timelineGroups, refreshTransactions } =
    useTransactions(user);

  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <main
        className={`d-flex justify-content-center align-items-center w-100 h-100 gap-lg-5`}
        style={{ maxWidth: "1200px" }}
      >
        <SidebarMenu />
        <div className={`${styles.cardsWrapper} col`}>
          <BalanceCard user={user} balance={balance} />
          <NewTransactionCard
            user={user}
            refreshTransactions={refreshTransactions}
          />
          <TransactionHistory
            transactions={transactions}
            timelineGroups={timelineGroups}
          />
        </div>
        <SidebarTransactionHistory timelineGroups={timelineGroups} />
      </main>
    </div>
  );
}
