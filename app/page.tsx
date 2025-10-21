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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ width: "600px" }}>
          <TransactionList
            transactions={transactions}
            onEdit={(id) => console.log("Editar:", id)}
            onDelete={(id) => console.log("Excluir:", id)}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
