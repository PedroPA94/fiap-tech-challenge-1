import { Button, Card, Timeline } from "@/design-system/components";
import { TimelineGroupProps } from "@/design-system/components/Timeline/TimelineGroup/TimelineGroup";
import Link from "next/link";
import { useMemo } from "react";

interface SidebarTransactionHistoryProps {
  timelineGroups: TimelineGroupProps[];
}

export function SidebarTransactionHistory({
  timelineGroups,
}: SidebarTransactionHistoryProps) {
  const MAX_ITEMS = 10;

  const limitedTimelineGroups = useMemo(() => {
    const result: TimelineGroupProps[] = [];
    let count = 0;

    for (const group of timelineGroups) {
      if (count >= MAX_ITEMS) break;

      const remaining = MAX_ITEMS - count;
      const limitedItems = group.timelineItems.slice(0, remaining);

      result.push({
        ...group,
        timelineItems: limitedItems,
      });

      count += limitedItems.length;
    }

    return result;
  }, [timelineGroups]);

  return (
    <div className="d-none d-lg-block col-2 align-self-stretch">
      <Card kind="neutral">
        <div className="d-flex flex-column gap-5">
          <h2 className="text-h-md fw-bold text-primary mb-0">Extrato</h2>

          <Timeline groups={limitedTimelineGroups} />

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
