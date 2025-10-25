"use client";

import { MenuItem, MenuItemProps } from "./MenuItem/MenuItem";
import styles from "./Menu.module.css";
import { usePathname } from "next/navigation";

interface MenuProps {
  navigationItems: MenuItemProps[];
}

/**
 * Componente de navegação vertical que exibe uma lista de itens de menu.
 *
 * @param props - Propriedades do componente
 * @param props.navigationItems - Lista de objetos contendo os itens de navegação a serem exibidos.
 *
 * @example
 * ```tsx
 * const navigationItems = [
 *   { content: "Início", link: "/" },
 *   { content: "Transações", link: "/transactions" },
 *   { content: "Configurações", link: "/settings" },
 * ];
 *
 * <Menu navigationItems={navigationItems} />
 * ```
 */
export function Menu({ navigationItems }: MenuProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.menu}>
      <ul>
        {navigationItems.map((item, index) => (
          <MenuItem
            content={item.content}
            link={item.link}
            last={index === navigationItems.length - 1}
            key={item.content}
            selected={item.link === pathname}
          />
        ))}
      </ul>
    </nav>
  );
}
