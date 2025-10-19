import styles from "./DropdownItem.module.css";

export interface DropdownItemProps
  extends React.HTMLAttributes<HTMLOptionElement> {
  value: string | number | undefined;
  content: string;
  isHighlighted?: boolean;
}

export function DropdownItem({
  value,
  content,
  isHighlighted,
}: DropdownItemProps) {
  return (
    <option
      className={styles.dropdownItem}
      value={value}
      aria-selected={isHighlighted}
    >
      {content}
    </option>
  );
}
