import { AmountDisplay } from "../../AmountDisplay/AmountDisplay";
import { Divider } from "../../Divider/Divider";
import styles from "./TimelineItem.module.css";

export interface TimelineItemProps {
  amount: number;
  currency?: string;
  label: string;
  date: string;
  last?: boolean;
}

/**
 * @internal
 **/
export function TimelineItem({
  amount,
  currency = "BRL",
  label,
  date,
  last = false,
}: TimelineItemProps) {
  // Formata para "DD/MM" de acordo com o locale do usuário
  const formatDate = (value: string) => {
    const parsedDate = new Date(
      value.includes("T") ? value : `${value}T00:00:00`
    );

    if (isNaN(parsedDate.getTime())) return "";

    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "2-digit",
    }).format(parsedDate);
  };
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineAmount}>
        <AmountDisplay
          amount={amount < 0 ? -amount : amount}
          currency={currency}
          label={label}
          size="small"
          style="dark"
          kind={amount >= 0 ? "positive" : "negative"}
        />
        {!last && <Divider kind="soft" type="primary" />}
      </div>
      <span>{formatDate(date)}</span>
    </div>
  );
}
