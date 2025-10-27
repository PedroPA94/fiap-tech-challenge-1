import React from "react";
import {
  TimelineGroup,
  TimelineGroupProps,
} from "./TimelineGroup/TimelineGroup";
import styles from "./Timeline.module.css";

interface TimelineProps {
  groups: TimelineGroupProps[];
}

/**
 * Componente de timeline que renderiza grupos de transações.
 *
 * **Importante:** todas as datas fornecidas nos itens devem estar em **formato ISO (`YYYY-MM-DD`)**.
 *
 * @param props - Propriedades do componente
 * @param props.groups - Lista de grupos de timeline, cada um contendo:
 *
 * @example
 * ```tsx
 * <Timeline
 *   groups={[
 *     {
 *       title: "Outubro 2025",
 *       timelineItems: [
 *         { amount: 1000, label: "Depósito", date: "2025-10-10" },
 *         { amount: -200, label: "Saque", date: "2025-10-02" },
 *       ],
 *     },
 *     {
 *       title: "Novembro 2025",
 *       timelineItems: [
 *         { amount: 500, label: "Depósito", date: "2025-11-05" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function Timeline({ groups }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {groups.map((group, index) => (
        <TimelineGroup
          key={index}
          title={group.title}
          timelineItems={group.timelineItems}
        />
      ))}
    </div>
  );
}
