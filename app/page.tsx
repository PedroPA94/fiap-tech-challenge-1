"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  AmountDisplay,
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  Dropdown,
  Header,
  Input,
  Menu,
  Timeline,
  TransactionList,
} from "@/design-system/components";
import { useEffect, useState } from "react";
import { link } from "fs";
import { TransactionItem } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";

export default function Home() {
  const transactions = [
    {
      amount: 100,
      date: "2025-09-10",
      label: "Deposito",
      id: "1",
    },
    {
      amount: -100,
      date: "2025-10-10",
      label: "Deposito",
      id: "2",
    },
    {
      amount: 100,
      date: "2025-10-10",
      label: "Deposito",
      id: "3",
    },
    {
      amount: 100,
      date: "2025-11-10",
      label: "Deposito",
      id: "4",
    },
    {
      amount: -100,
      date: "2025-10-10",
      label: "Deposito",
      id: "5",
    },
    {
      amount: 100,
      date: "2025-10-10",
      label: "Deposito",
      id: "6",
    },
  ];
  const [posts, setPosts] = useState<unknown[]>([]);

  async function fetchPosts() {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setPosts(data);
    console.log(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {posts.map((p) => (
          <p key={1}>{JSON.stringify(p)}</p>
        ))}
      </main>
    </div>
  );
}
