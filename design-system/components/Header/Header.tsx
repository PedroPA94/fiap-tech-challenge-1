"use client";

import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

import styles from "./Header.module.css";
import { Avatar } from "../Avatar/Avatar";
import { useEffect, useRef, useState } from "react";
import { Menu } from "../Menu/Menu";
import { MenuItemProps } from "../Menu/MenuItem/MenuItem";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  username: string;
  showIcon: boolean;
  navigationItems: MenuItemProps[];
  height?: string;
}

/**
 * Componente de cabeçalho que exibe o menu, avatar do usuário e permite customização de altura
 *
 * @param props - Propriedades do componente
 * @param props.username - Nome do usuário a ser exibido no header
 * @param [props.showIcon=true] - Determina se o ícone do menu será exibido
 * @param [props.height="100px"] - Altura do header
 *
 * @example
 * ```tsx
 * <Header username="Foo Bar" showIcon={true} height="120px" />
 * ```
 */
export function Header({
  username = "User",
  showIcon = true,
  navigationItems = [],
  height = "100px",
  ...props
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowMenu((prev) => !prev);
    }
  };

  return (
    <header
      className={`${styles.header} ${
        showIcon
          ? "justify-content-between justify-content-lg-end"
          : "justify-content-end"
      } position-relative`}
      style={{ height }}
      {...props}
    >
      {showIcon && (
        <div className="d-lg-none position-relative" ref={menuRef}>
          <button
            className="d-lg-none position-relative btn p-0"
            onClick={() => setShowMenu((prev) => !prev)}
            onKeyDown={handleKeyDown}
            aria-label="Abrir menu"
          >
            <Icon path={mdiMenu} size={1.3} className={styles.icon} />
          </button>

          {showMenu && (
            <div className={styles.menu}>
              <button
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Fechar menu"
                onClick={() => setShowMenu(false)}
              ></button>
              <div className="mx-2 mt-4">
                <Menu navigationItems={navigationItems} />
              </div>
            </div>
          )}
        </div>
      )}
      <Avatar username={username} />
    </header>
  );
}
