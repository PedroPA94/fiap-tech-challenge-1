import { useEffect, useState } from "react";
import { Input, Dropdown } from "@/design-system/components";
import { TransactionItemProps } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";

interface TransactionFormProps {
  transaction?: TransactionItemProps;
  onChange?: (data: TransactionItemProps) => void;
}

export function TransactionForm({
  transaction,
  onChange,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionItemProps>({
    id: transaction?.id ?? "",
    date: transaction?.date ?? "",
    label: transaction?.label ?? "",
    amount: transaction?.amount ?? 0,
    currency: transaction?.currency ?? "BRL",
  });

  useEffect(() => {
    if (transaction) {
      setForm(transaction);
    }
  }, [transaction]);

  useEffect(() => {
    onChange?.(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <form className="d-flex flex-column gap-4">
      <Input
        type="date"
        label="Data"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <Input
        type="number"
        label="Valor"
        placeholder="Informe o valor da transação"
        required
        value={form.amount.toString()}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
      />

      <Dropdown
        label="Tipo de transação"
        placeholder="Selecione"
        options={[
          { value: "Depósito", content: "Depósito" },
          { value: "Transferência", content: "Transferência" },
          { value: "Pagamento", content: "Pagamento" },
        ]}
        labelColor="text-primary"
        value={form.label}
        onChange={(value) => setForm({ ...form, label: value as string })}
      />
    </form>
  );
}
