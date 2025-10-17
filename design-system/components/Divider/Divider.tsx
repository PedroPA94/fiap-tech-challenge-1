import { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  type?: "primary" | "secondary" | "highlight";
  kind?: "regular" | "soft";
}

/**
 * Linha horizontal para separação visual de conteúdo
 *
 * @param props - Propriedades do componente
 * @param [props.type="primary"] - Cor do divisor
 * @param [props.kind="regular"] - Espessura do divisor
 *
 * @example
 * ```tsx
 * // Divisor padrão
 * <Divider />
 *
 * // Divisor com estilo personalizado
 * <Divider
 *   type="secondary"
 *   kind="soft"
 * />
 * ```
 */
export function Divider({
  type = "primary",
  kind = "regular",
  ...props
}: DividerProps) {
  return (
    <hr
      className={`${styles.divider} ${styles[type]} ${styles[kind]}`}
      {...props}
    />
  );
}
