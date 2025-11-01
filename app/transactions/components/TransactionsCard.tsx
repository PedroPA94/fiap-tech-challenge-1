import { Card, Button, TransactionList } from "@/design-system/components";
import { TransactionItemProps } from "@/design-system/components/TransactionList/TransactionItem/TransactionItem";
import Image from "next/image";

interface TransactionsCardProps {
  transactions: TransactionItemProps[];
}

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  return (
    <Card kind="neutral" spacing="regular">
      <div className="d-flex flex-column justify-content-center align-items-start gap-5">
        <div className="w-100 d-lg-flex justify-content-between">
          <div className="d-flex flex-column flex-sm-row flex-lg-column gap-5 justify-content-sm-between justify-content-lg-center align-items-sm-center align-items-lg-start">
            <h2 className="text-h-md fw-bold text-primary mb-0">Transações</h2>
            <div className="flex-auto">
              <Button type="button">Adicionar transação</Button>
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
          <TransactionList kind="compact" transactions={transactions} />
        </div>
        <div className="d-none d-sm-block d-lg-none w-100">
          <TransactionList kind="default" transactions={transactions} />
        </div>
        <div className="d-none d-lg-block w-100" style={{ maxHeight: "500px" }}>
          <TransactionList kind="default" transactions={transactions} />
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
  );
}
