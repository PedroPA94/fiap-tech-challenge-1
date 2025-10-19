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
} from "@/design-system/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setError("O nome deve ter ao menos 3 caracteres");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          required
          value={name}
          onChange={handleChange}
          hint={error || "Seu nome completo"}
          error={Boolean(error)}
        />
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
