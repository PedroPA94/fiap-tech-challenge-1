import { Button, Card, Timeline } from "@/design-system/components";
import { TimelineGroupProps } from "@/design-system/components/Timeline/TimelineGroup/TimelineGroup";
import Link from "next/link";

interface SidebarTransactionHistoryProps {
  timelineGroups: TimelineGroupProps[];
}

export function SidebarTransactionHistory({
  timelineGroups,
}: SidebarTransactionHistoryProps) {
  return (
    <div className="d-none d-lg-block col-2 align-self-stretch">
      <Card kind="neutral">
        <div className="d-flex flex-column gap-5">
          <h2 className="text-h-md fw-bold text-primary mb-0">Extrato</h2>

          <Timeline groups={timelineGroups} />

          <Link href={"/transactions"}>
            <Button type="button" kind="ghost">
              Ver mais
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
