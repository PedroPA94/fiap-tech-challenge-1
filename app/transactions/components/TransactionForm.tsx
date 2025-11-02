import { useEffect, useState } from "react";
import { Input, Dropdown } from "@/design-system/components";
import { TransactionItemProps } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";
import { useTransactionTypes } from "@/app/providers/TransactionTypesProvider";

export type TransactionFormState = Omit<TransactionItemProps, "amount"> & {
  amount: string | number;
};

interface TransactionFormProps {
  transaction?: TransactionFormState;
  onChange?: (data: TransactionFormState) => void;
}

export function TransactionForm({
  transaction,
  onChange,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionFormState>({
    id: transaction?.id ?? "",
    date: transaction?.date ?? "",
    label: transaction?.label ?? "",
    amount: transaction?.amount ?? "",
    currency: transaction?.currency ?? "BRL",
  });

  const transactionTypes = useTransactionTypes();

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
        type="text"
        label="Valor"
        placeholder="Informe o valor da transação"
        required
        value={form.amount.toString()}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value.replace(",", ".") })
        }
      />

      <Dropdown
        label="Tipo de transação"
        placeholder="Selecione"
        options={transactionTypes.map((t) => ({
          value: t,
          content: t,
        }))}
        labelColor="text-primary"
        value={form.label}
        onChange={(value) => setForm({ ...form, label: value as string })}
      />
    </form>
  );
}
