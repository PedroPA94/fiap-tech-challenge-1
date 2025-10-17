import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

import styles from "./Header.module.css";
import { Avatar } from "../Avatar/Avatar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  username: string;
  showIcon: boolean;
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
  height = "100px",
  ...props
}: HeaderProps) {
  return (
    <header
      className={`${styles.header} ${showIcon ? styles.withIcon : ""}`}
      style={{ height }}
      {...props}
    >
      {showIcon && (
        <div tabIndex={0}>
          <Icon path={mdiMenu} size={1} className={styles.icon} />
        </div>
      )}
      <Avatar username={username} />
    </header>
  );
}
