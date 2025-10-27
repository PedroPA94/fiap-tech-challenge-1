import { IconButton } from "../../IconButton/IconButton";
import { mdiPencil, mdiDelete } from "@mdi/js";

import styles from "./TransactionItem.module.css";
import React from "react";
import { AmountDisplay } from "../../AmountDisplay/AmountDisplay";
import { Divider } from "../../Divider/Divider";

export interface TransactionItemProps {
  date: string;
  label: string;
  amount: number;
  id: string;
  currency?: string;
  kind?: "default" | "compact";
  showIcons?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * @internal
 **/
export function TransactionItem({
  date,
  label,
  amount,
  id,
  currency = "BRL",
  kind = "default",
  showIcons,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  // Formata para "DD mês AAAA" de acordo com o locale do usuário
  const formatDate = (value: string) => {
    const parsedDate = new Date(
      value.includes("T") ? value : `${value}T00:00:00`
    );

    if (isNaN(parsedDate.getTime())) return "";

    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const iconSize = kind === "compact" ? "small" : "regular";
  const amountKind = amount >= 0 ? "positive" : "negative";
  const formattedAmount = Math.abs(amount);

  return (
    <div className={styles.transactionItemContainer}>
      <div className={`${styles.transactionItem} ${styles[kind]}`}>
        <span className="col-5">{formatDate(date)}</span>
        {kind === "default" && (
          <React.Fragment>
            <span className="col">{label}</span>
            <div className={`${styles[amountKind]} col text-end`}>
              {amountKind === "negative" && <span>- </span>}
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: currency,
                  minimumFractionDigits: 2,
                })
                  .format(0)
                  .replace(/[\d.,\s]/g, "")}
              </span>
              <span>
                {" " +
                  new Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(formattedAmount)}
              </span>
            </div>
          </React.Fragment>
        )}
        {kind === "compact" && (
          <div className="col">
            <AmountDisplay
              amount={formattedAmount}
              label={label}
              currency={currency}
              size="small"
              style="dark"
              kind={amountKind}
            />
          </div>
        )}
        {showIcons && (
          <div className={`${styles.icons} ps-3`}>
            <IconButton
              iconPath={mdiPencil}
              kind="primary"
              size={iconSize}
              onClick={() => onEdit?.(id)}
            />
            <IconButton
              iconPath={mdiDelete}
              kind="primary"
              size={iconSize}
              onClick={() => onDelete?.(id)}
            />
          </div>
        )}
      </div>
      <Divider kind="soft" type="secondary" />
    </div>
  );
}
