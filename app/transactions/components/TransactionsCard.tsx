import { formatShortTextDate } from "@/app/lib/dateUtils";
import {
  Card,
  Button,
  TransactionList,
  Dialog,
} from "@/design-system/components";
import { TransactionItemProps } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";
import Image from "next/image";
import React, { useState } from "react";
import { TransactionForm, TransactionFormState } from "./TransactionForm";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../services/transactionService";
import { User } from "@/app/lib/interfaces";

interface TransactionsCardProps {
  user: User;
  transactions: TransactionItemProps[];
  refreshTransactions: () => Promise<void>;
}

export function TransactionsCard({
  user,
  transactions,
  refreshTransactions,
}: TransactionsCardProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionItemProps>();
  const [formData, setFormData] = useState<TransactionFormState>();
  const [dialog, setDialog] = useState<"new" | "edit" | "delete" | null>(null);

  const openNewDialog = () => setDialog("new");
  const openEditDialog = (id: string) => {
    setSelectedTransaction(transactions.find((t) => t.id === id));
    setDialog("edit");
  };
  const openDeleteDialog = (id: string) => {
    setSelectedTransaction(transactions.find((t) => t.id === id));
    setDialog("delete");
  };
  const handleConfirm = async () => {
    try {
      if (dialog === "new" && formData) {
        await createTransaction({
          id: "",
          type: formData.label,
          value: Number(formData.amount),
          timestamp: formData.date,
          userId: user.userId,
        });
      } else if (dialog === "edit" && formData) {
        await updateTransaction({
          id: formData.id,
          type: formData.label,
          value: Number(formData.amount),
          timestamp: formData.date,
          userId: user.userId,
        });
      } else if (dialog === "delete" && selectedTransaction) {
        await deleteTransaction(selectedTransaction.id);
      }

      await refreshTransactions();
    } catch (err) {
      console.error("Erro ao confirmar:", err);
    } finally {
      setDialog(null);
    }
  };

  return (
    <React.Fragment>
      <Card kind="neutral" spacing="regular">
        <div className="d-flex flex-column justify-content-center align-items-start gap-5">
          <div className="w-100 d-lg-flex justify-content-between">
            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-5 justify-content-sm-between justify-content-lg-center align-items-sm-center align-items-lg-start">
              <h2 className="text-h-md fw-bold text-primary mb-0">
                Transações
              </h2>
              <div className="flex-auto">
                <Button type="button" onClick={() => openNewDialog()}>
                  Adicionar transação
                </Button>
              </div>
            </div>

            <Image
              src="/card_image_3.svg"
              alt=""
              width={300}
              height={198}
              className="d-none d-lg-block"
            />
          </div>
          <div className="d-sm-none w-100">
            <TransactionList
              kind="compact"
              transactions={transactions}
              onEdit={(id) => openEditDialog(id)}
              onDelete={(id) => openDeleteDialog(id)}
            />
          </div>
          <div className="d-none d-sm-block d-lg-none w-100">
            <TransactionList
              kind="default"
              transactions={transactions}
              onEdit={(id) => openEditDialog(id)}
              onDelete={(id) => openDeleteDialog(id)}
            />
          </div>
          <div
            className="d-none d-lg-block w-100"
            style={{ maxHeight: "500px" }}
          >
            <TransactionList
              kind="default"
              transactions={transactions}
              onEdit={(id) => openEditDialog(id)}
              onDelete={(id) => openDeleteDialog(id)}
            />
          </div>
          <div className="align-self-center">
            <Image
              src="/card_image_3.svg"
              alt=""
              width={300}
              height={182}
              className="d-sm-none"
            />

            <Image
              src="/card_image_3.svg"
              alt=""
              width={608}
              height={370}
              className="d-none d-sm-block d-lg-none"
            />
          </div>
        </div>
      </Card>

      <Dialog
        title="Adicionar transação"
        isOpen={dialog === "new"}
        onClose={() => setDialog(null)}
        onPrimaryClick={handleConfirm}
        onSecondaryClick={() => setDialog(null)}
        primaryLabel="Confirmar"
        secondaryLabel="Cancelar"
      >
        <TransactionForm onChange={setFormData} />
      </Dialog>

      <Dialog
        title="Editar transação"
        isOpen={dialog === "edit"}
        onClose={() => setDialog(null)}
        onPrimaryClick={handleConfirm}
        onSecondaryClick={() => setDialog(null)}
        primaryLabel="Confirmar"
        secondaryLabel="Cancelar"
      >
        <TransactionForm
          transaction={selectedTransaction}
          onChange={setFormData}
        />
      </Dialog>

      <Dialog
        title="Excluir transação"
        isOpen={dialog === "delete"}
        onClose={() => setDialog(null)}
        onPrimaryClick={handleConfirm}
        onSecondaryClick={() => setDialog(null)}
        primaryLabel="Confirmar"
        secondaryLabel="Cancelar"
        type="critical"
      >
        <div className="d-flex justify-content-between fw-bold mb-5 gap-3">
          <span>{formatShortTextDate(selectedTransaction?.date || "")}</span>
          <span>{selectedTransaction?.label}</span>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: selectedTransaction?.currency || "BRL",
            }).format(selectedTransaction?.amount || 0)}
          </span>
        </div>
        <p>Deseja excluir essa transação?</p>
      </Dialog>
    </React.Fragment>
  );
}
