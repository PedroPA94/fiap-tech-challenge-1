import { useState } from "react";
import { Divider } from "../../Divider/Divider";
import styles from "./MenuItem.module.css";

export interface MenuItemProps {
  content: string;
  link: string;
  last?: boolean;
  selected?: boolean;
}

export function MenuItem({ content, link, last, selected }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Define o tipo do Divider com base no estado atual
  const dividerType = selected
    ? "highlight"
    : isHovered || isFocused
    ? "primary"
    : "secondary";

  return (
    <li className={`${styles.menuItem} ${selected ? styles.selected : ""}`}>
      <a
        href={link}
        className={`${styles.menuLink} ${selected ? styles.selected : ""}`}
        aria-current={selected ? "page" : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span>{content}</span>
        {!last && <Divider type={dividerType} />}
      </a>
    </li>
  );
}
