import { mdiAccount } from "@mdi/js";

import styles from "./Avatar.module.css";
import { IconButton } from "../IconButton/IconButton";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
}

/**
 * Componente que exibe o avatar do usuário, incluindo nome e um ícone associado
 *
 * @param props - Propriedades do componente
 * @param props.username - Nome do usuário a ser exibido no avatar
 *
 * @example
 * ```tsx
 * <Avatar username="Foo Bar" />
 * ```
 */
export function Avatar({ username = "User", ...props }: AvatarProps) {
  return (
    <div className={styles.avatar} {...props}>
      <p>{username}</p>
      <IconButton iconPath={mdiAccount} kind="ghost" />
    </div>
  );
}
