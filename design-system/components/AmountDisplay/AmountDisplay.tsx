import styles from "./AmountDisplay.module.css";

interface AmountDisplayProps {
  label: string;
  amount: number;
  kind?: "neutral" | "positive" | "negative";
  style?: "dark" | "light";
  size?: "small" | "regular" | "large";
  currency?: string;
}

/**
 * Componente para exibição de valores monetários com rótulo e formatação automática.
 *
 * @param props - Propriedades do componente
 * @param props.label - Texto descritivo exibido junto ao valor
 * @param props.amount - Valor numérico a ser exibido
 * @param [props.kind="neutral"] - Tipo de valor exibido (positivo, negativo ou neutro)
 * @param [props.style="dark"] - Estilo visual do componente (claro ou escuro)
 * @param [props.size="regular"] - Tamanho do componente (small, regular ou large)
 * @param [props.currency="BRL"] - Moeda utilizada na formatação
 *
 * @example
 * ```tsx
 * <AmountDisplay
 *   label="Saldo disponível"
 *   amount={1234.56}
 *   kind="positive"
 * />
 * ```
 */
export function AmountDisplay({
  label,
  amount,
  kind = "neutral",
  style = "dark",
  size = "regular",
  currency = "BRL",
}: AmountDisplayProps) {
  return (
    <div className={`${styles.amountDisplay} ${styles[style]} ${styles[size]}`}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles[size]}__amount ${styles[kind]}`}>
        {kind === "negative" && <span>- </span>}
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
          })
            .format(0)
            .replace(/[\d.,\s]/g, "")}
        </span>
        <span className={styles.amountDisplay__amount}>
          {" " +
            new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(amount)}
        </span>
      </div>
    </div>
  );
}
