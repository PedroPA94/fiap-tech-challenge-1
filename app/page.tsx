"use client";

import { AmountDisplay, Card, Divider } from "@/design-system/components";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Card kind="primary" spacing="regular">
          <div className={`${styles.cardContent} textLight`}>
            <div>
              <h1 className="textHeadingMedium textBold">Olá, Joana! :)</h1>
              <p>Quinta-feira, 10/09/2025</p>
            </div>

            <div>
              <p>Saldo</p>
              <Divider type="highlight" />
              <AmountDisplay
                style="light"
                amount={2500}
                label="Conta Corrente"
                size="large"
                kind="neutral"
              />
            </div>
            <Image
              src="/filler_image_1.png"
              alt=""
              width={250}
              height={230}
              className={styles.cardImage}
            />
          </div>
        </Card>
      </main>
    </div>
  );
}
