import { useEffect, useMemo, useState } from "react";
import { Transaction, User } from "../interfaces";
import { TimelineGroupProps } from "@/design-system/components/Timeline/TimelineGroup/TimelineGroup";
import { getMonthName, getMonthNameIndex, getYear } from "../dateUtils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export function useTransactions(user: User) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Busca transações do usuário
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const res = await fetch(
        `${BASE_URL}/api/transactions?userId=${user.userId}`
      );
      const data = await res.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, [user]);

  // Calcula saldo
  const balance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      return acc + t.value;
    }, 0);
  }, [transactions]);

  // Cria grupos para componente Timeline
  const timelineGroups = useMemo<TimelineGroupProps[]>(() => {
    const groups: TimelineGroupProps[] = [];

    transactions.forEach((t) => {
      const month = getMonthName(t.timestamp);
      const year = getYear(t.timestamp);
      const title = `${month} ${year}`;

      let group = groups.find((g) => g.title === title);

      if (!group) {
        group = {
          title,
          timelineItems: [],
        };
        groups.push(group);
      }

      group.timelineItems.push({
        amount: t.value,
        label: t.type,
        date: t.timestamp,
      });
    });

    return groups.sort((a, b) => {
      const [monthA, yearA] = a.title.split(" ");
      const [monthB, yearB] = b.title.split(" ");

      const dateA = new Date(`${yearA}-${getMonthNameIndex(monthA) + 1}-01`);
      const dateB = new Date(`${yearB}-${getMonthNameIndex(monthB) + 1}-01`);

      return dateB.getTime() - dateA.getTime();
    });
  }, [transactions]);

  return { transactions, balance, timelineGroups };
}
