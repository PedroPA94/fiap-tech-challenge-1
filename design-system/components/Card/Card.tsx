import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "primary" | "secondary" | "neutral";
  spacing?: "small" | "regular" | "large";
  children: React.ReactNode;
}

/**
 * Card é um container flexível que agrupa conteúdo relacionado
 *
 * @param props
 * @param props.kind - Estilo visual do card
 * @param props.spacing - Espaçamento interno do card
 * @param props.children - Conteúdo que será renderizado dentro do card
 *
 * @example
 * ```tsx
 * // Card básico com estilo padrão
 * <Card>
 *   <h2>Título</h2>
 *   <p>Conteúdo do card</p>
 * </Card>
 *
 * // Card secundário com espaçamento maior
 * <Card
 *   kind="secondary"
 *   spacing="large"
 * >
 *   <Button>Ação</Button>
 * </Card>
 * ```
 */
export function Card({
  kind = "primary",
  spacing = "regular",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[kind]} ${styles[spacing]}`}
      {...props}
    >
      {children}
    </div>
  );
}
