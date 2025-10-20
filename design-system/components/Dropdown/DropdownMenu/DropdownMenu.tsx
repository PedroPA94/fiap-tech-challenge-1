import { DropdownItem, DropdownItemProps } from "../DropdownItem/DropdownItem";
import styles from "./DropdowndMenu.module.css";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  options: (DropdownItemProps & {
    id: string;
    onClick?: () => void;
  })[];
}

/**
 * @internal
 **/
export function DropdownMenu({ options }: DropdownMenuProps) {
  return (
    <div className={styles.dropdownMenu}>
      {options.map((option) => (
        <div key={option.id} id={option.id} onClick={option.onClick}>
          <DropdownItem
            value={option.value}
            content={option.content}
            isHighlighted={option.isHighlighted}
          />
        </div>
      ))}
    </div>
  );
}
