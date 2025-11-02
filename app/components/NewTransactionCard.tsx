import {
  Card,
  Dropdown,
  Input,
  Button,
  Toast,
  ToastKind,
} from "@/design-system/components";
import Image from "next/image";
import { useState } from "react";
import { Transaction, User } from "../lib/interfaces";
import { createTransaction } from "../services/transactionService";
import { useLoading } from "../providers/LoadingProvider";

interface NewTransactionCardProps {
  user: User;
  refreshTransactions: () => Promise<void>;
}

export function NewTransactionCard({
  user,
  refreshTransactions,
}: NewTransactionCardProps) {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    timestamp: new Date().toISOString().slice(0, 19),
    type: "",
    value: 0,
    userId: user.userId,
  });
  const [toast, setToast] = useState<{
    message: string;
    kind: ToastKind;
    show: boolean;
  }>({
    message: "",
    kind: "info",
    show: false,
  });
  const { setLoading } = useLoading();

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await createTransaction(newTransaction);
      await refreshTransactions();
      showToast("Transação adicionada com sucesso!", "success");
    } catch (err) {
      console.error("Erro ao criar nova transação:", err);
      showToast("Erro ao adicionar transação", "danger");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, kind: ToastKind) => {
    setToast({ message, kind, show: true });
  };

  return (
    <>
      <Card kind="secondary" spacing="regular">
        <div className="d-flex flex-column justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-primary">
          <h2 className="text-h-md fw-bold">
            Nova transação em {new Date().toLocaleDateString()}
          </h2>

          <div className="d-flex flex-column flex-sm-row gap-5 justify-content-sm-between">
            <div className="d-flex flex-column gap-5">
              <Dropdown
                label="Tipo de transação"
                placeholder="Selecione"
                options={[{ value: 1, content: "Teste" }]}
                labelColor="text-primary"
                onChange={(value) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: value as string,
                  })
                }
              />

              <Input
                label="Valor"
                labelColor="text-primary"
                placeholder="Informe o valor da transação"
                required
                type="text"
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    value: Number(e.target.value.replace(",", ".")),
                  })
                }
              />

              <Button type="button" onClick={() => handleButtonClick()}>
                Concluir transação
              </Button>
            </div>
            <div className="pt-5 align-self-center align-self-sm-end">
              <Image
                src="/filler_image_2.png"
                alt=""
                width={180}
                height={228}
              />
            </div>
          </div>
        </div>
      </Card>
      <Toast
        message={toast.message}
        show={toast.show}
        kind={toast.kind}
        onClose={() => {
          setToast((t) => ({ ...t, show: false }));
        }}
      />
    </>
  );
}
