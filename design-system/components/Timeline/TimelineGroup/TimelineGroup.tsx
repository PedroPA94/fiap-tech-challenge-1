import { TimelineItem, TimelineItemProps } from "../TimelineItem/TimelineItem";
import styles from "./TimelineGroup.module.css";

export interface TimelineGroupProps {
  title: string;
  timelineItems: TimelineItemProps[];
}

/**
 * @internal
 **/
export function TimelineGroup({ title, timelineItems }: TimelineGroupProps) {
  const sortedItems = [...timelineItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.timelineGroup}>
      <span>{title}</span>
      {sortedItems.map((item, index) => (
        <TimelineItem
          key={index}
          amount={item.amount}
          currency={item.currency}
          label={item.label}
          date={item.date}
          last={index === timelineItems.length - 1}
        />
      ))}
    </div>
  );
}
