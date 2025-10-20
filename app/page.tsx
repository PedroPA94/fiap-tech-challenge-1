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
} from "@/design-system/components";
import { useEffect, useState } from "react";
import { link } from "fs";

export default function Home() {
  const items = [
    { amount: 1000, date: "2025-10-04", label: "Depósito" },
    { amount: -200, date: "2025-10-10", label: "Saque" },
    { amount: 500, date: "2025-10-15", label: "Depósito" },
  ];

  const groups = [
    {
      title: "Outubro 2025",
      timelineItems: items,
    },
    {
      title: "Setembro 2025",
      timelineItems: [
        { amount: -150, date: "2025-09-20", label: "Saque" },
        { amount: 300, date: "2025-09-25", label: "Depósito" },
      ],
    },
  ];
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Timeline groups={groups} />
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
