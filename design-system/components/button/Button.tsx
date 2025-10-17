import { ComponentProps } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  kind: "primary" | "secondary" | "critical" | "ghost";
}

/**
 * Componente de botão customizável que suporta diferentes variações visuais
 *
 * @param props - Propriedades do componente
 * @param [props.kind="primary"] - Estilo visual do botão
 * @param [props.type="button"] - Tipo do botão HTML
 *
 * @example
 * ```tsx
 * <Button kind="primary" onClick={() => {}}>
 *   Clique aqui
 * </Button>
 * ```
 */
export function Button({
  kind = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[kind]}`}
      type={type}
      {...props}
    >
      {props.children}
    </button>
  );
}
