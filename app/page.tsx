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
  Header,
} from "@/design-system/components";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={() => setOpen(true)}>Abrir diálogo</button>

        <Dialog
          size="regular"
          type="critical"
          isOpen={open}
          onClose={() => setOpen(false)}
          onPrimaryClick={() => setOpen(false)}
          primaryLabel="OK"
          title="Exemplo de Diálogo"
        >
          <p>Este é um exemplo de diálogo usando o componente Dialog.</p>
        </Dialog>
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
