import { AmountDisplay, Card, Divider } from "@/design-system/components";
import Image from "next/image";
import { getFormattedToday } from "../lib/dateUtils";
import { mdiEye } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "../lib/interfaces";
import styles from "../page.module.css";

interface BalanceCardProps {
  user: User | null;
  balance: number;
}

export function BalanceCard({ user, balance }: BalanceCardProps) {
  return (
    <Card kind="primary" spacing="regular">
      <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-light">
        <div className="d-sm-flex flex-column gap-sm-5 pe-md-5">
          <div className="d-flex flex-column gap-3">
            <h1 className="text-h-md fw-bold">
              Olá {user ? ", " + user.firstname : ""}! :)
            </h1>
            <p className="text-b-md">{getFormattedToday()}</p>
          </div>
          <Image
            src="/filler_image_1.png"
            alt=""
            width={250}
            height={230}
            className="align-self-center d-none d-sm-block"
          />
        </div>

        <div className="d-flex flex-column gap-3 align-self-sm-center flex-grow-1 pb-5 ps-md-5 pe-sm-3">
          <div className="d-flex gap-5">
            <h2 className="text-h-sm fw-bold mb-0">Saldo</h2>
            <Icon path={mdiEye} size={1} className={styles.icon} />
          </div>
          <Divider type="highlight" />

          <AmountDisplay
            style="light"
            amount={balance}
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
          className="align-self-center d-sm-none"
        />
      </div>
    </Card>
  );
}
