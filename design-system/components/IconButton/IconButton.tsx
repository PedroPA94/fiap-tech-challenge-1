import Icon from "@mdi/react";
import { mdiDeathStarVariant } from "@mdi/js";

import styles from "./IconButton.module.css";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "ghost";
  size?: "regular" | "small";
  iconPath: string;
}

/**
 * Botão circular com ícone que suporta diferentes variações visuais
 *
 * @param props - Propriedades do componente
 * @param [props.kind="primary"] - Estilo visual do botão (primary | ghost)
 * @param [props.size="regular"] - Tamanho do botão (regular | small)
 * @param props.iconPath - Path do ícone MDI a ser renderizado
 * @param [props.disabled=false] - Estado desabilitado do botão
 *
 * @example
 * ```tsx
 * import { mdiHome } from "@mdi/js";
 *
 * <IconButton
 *   iconPath={mdiHome}
 *   kind="ghost"
 *   size="small"
 *   onClick={() => {}}
 * />
 * ```
 */
export function IconButton({
  kind = "primary",
  size = "regular",
  iconPath = mdiDeathStarVariant,
  disabled = false,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${styles[kind]}`}
      type="button"
      disabled={disabled}
      {...props}
    >
      <div
        className={`${styles.ellipsis} ${styles[kind]} ${styles[size]} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <Icon path={iconPath} size={1} />
      </div>
    </button>
  );
}
