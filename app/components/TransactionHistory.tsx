import {
  Card,
  Button,
  Timeline,
  TransactionList,
} from "@/design-system/components";
import { Transaction } from "../lib/interfaces";
import { TimelineGroupProps } from "@/design-system/components/Timeline/TimelineGroup/TimelineGroup";
import Link from "next/link";

interface TransactionHistoryProps {
  transactions: Transaction[];
  timelineGroups: TimelineGroupProps[];
}

export function TransactionHistory({
  transactions,
  timelineGroups,
}: TransactionHistoryProps) {
  return (
    <div className="d-lg-none">
      <Card kind="neutral" spacing="regular">
        <div className="d-flex flex-column justify-content-center justify-content-sm-between gap-5 px-2 py-1 p-sm-5 text-primary">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="text-h-md fw-bold">Extrato</h2>

            <Link href={"/transactions"}>
              <Button type="button" kind="ghost">
                Ver mais
              </Button>
            </Link>
          </div>

          <div className="d-sm-none">
            <Timeline groups={timelineGroups} />
          </div>

          <div className="d-none d-sm-block">
            <TransactionList
              showIcons={false}
              transactions={transactions?.map((t) => ({
                id: t.id,
                amount: t.value,
                label: t.type,
                date: t.timestamp.substring(0, 10),
              }))}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
