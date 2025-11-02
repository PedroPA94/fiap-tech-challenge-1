import { AmountDisplay, Card, Divider } from "@/design-system/components";
import Image from "next/image";
import { getFormattedToday } from "../lib/dateUtils";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "../lib/interfaces";
import styles from "../page.module.css";
import { useState } from "react";

interface BalanceCardProps {
  user: User | null;
  balance: number;
}

export function BalanceCard({ user, balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card kind="primary" spacing="regular">
      <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-light">
        <div className="d-sm-flex flex-column gap-sm-5 pe-md-5">
          <div className="d-flex flex-column gap-3">
            <h1 className="text-h-md fw-bold">
              Olá{user ? ", " + user.firstname : ""}! :)
            </h1>
            <p className="text-b-md">{getFormattedToday()}</p>
          </div>
          <Image
            src="/card_image_1.png"
            alt=""
            width={250}
            height={230}
            className="align-self-center d-none d-sm-block"
          />
        </div>

        <div className="d-flex flex-column gap-3 align-self-sm-center flex-grow-1 pb-5 ps-md-5 pe-sm-3">
          <div className="d-flex gap-5">
            <h2 className="text-h-sm fw-bold mb-0">Saldo</h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="btn p-0 bg-transparent"
              aria-label={showBalance ? "Esconder saldo" : "Exibir saldo"}
            >
              <Icon
                path={showBalance ? mdiEye : mdiEyeOff}
                size={1}
                className={styles.icon}
              />
            </button>
          </div>
          <Divider type="highlight" />

          {showBalance ? (
            <AmountDisplay
              style="light"
              amount={balance}
              label="Conta Corrente"
              size="large"
              kind="neutral"
            />
          ) : (
            <p className="text-h-md fw-bold">****</p>
          )}
        </div>
        <Image
          src="/card_image_1.png"
          alt=""
          width={250}
          height={230}
          className="align-self-center d-sm-none"
        />
      </div>
    </Card>
  );
}
