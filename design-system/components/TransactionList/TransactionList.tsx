import {
  TransactionItem,
  TransactionItemProps,
} from "./TransactionItem/TransactionItem";
import styles from "./TransactionList.module.css";

interface TransactionListProps {
  transactions: TransactionItemProps[];
  kind?: "default" | "compact";
  showIcons?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * Componente que exibe uma lista de transações financeiras, permitindo
 * ações de edição e exclusão em cada item.
 *
 * **Importante:** todas as datas fornecidas devem estar em **formato ISO (`YYYY-MM-DD`)**.
 *
 * @param props - Propriedades do componente
 * @param props.transactions - Array de transações a serem exibidas. Cada item deve conter id, date, label e amount.
 * @param [props.kind="default"] - Define o estilo de exibição dos itens: "default" ou "compact".
 * @param props.onEdit - Callback chamado ao clicar no botão de edição de um item. Recebe o id da transação.
 * @param props.onDelete - Callback chamado ao clicar no botão de exclusão de um item. Recebe o id da transação.
 *
 * @example
 * ```tsx
 * <TransactionList
 *   transactions={[
 *     { id: "1", label: "Depósito", amount: 1000, date: "2025-09-10" },
 *     { id: "2", label: "Pagamento", amount: -200, date: "2025-09-12" }
 *   ]}
 *   kind="default"
 *   onEdit={(id) => console.log("Editar", id)}
 *   onDelete={(id) => console.log("Excluir", id)}
 * />
 * ```
 */
export function TransactionList({
  transactions,
  kind = "default",
  showIcons = true,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className={styles.transactionList}>
      {sortedTransactions.map((t) => (
        <li key={t.id}>
          <TransactionItem
            amount={t.amount}
            date={t.date}
            label={t.label}
            id={t.id}
            kind={kind}
            showIcons={showIcons}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
