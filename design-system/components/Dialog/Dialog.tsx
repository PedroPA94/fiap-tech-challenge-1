import { useEffect } from "react";
import styles from "./Dialog.module.css";
import { Button } from "../Button/Button";

interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  type?: "default" | "critical";
  size?: "small" | "regular";
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  primaryLabel: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
  children?: React.ReactNode;
}

/**
 * Componente de diálogo (modal) acessível, com suporte a ações primária e secundária.
 *
 * @param props - Propriedades do componente
 * @param props.title - Título do diálogo
 * @param props.isOpen - Define se o diálogo está visível
 * @param props.onClose - Função chamada ao fechar o diálogo
 * @param props.onPrimaryClick - Função chamada ao clicar na ação primária
 * @param props.onSecondaryClick - Função chamada ao clicar na ação secundária
 * @param props.primaryLabel - Texto do botão de ação primária
 * @param props.secondaryLabel - Texto do botão de ação secundária
 * @param props.showSecondary - Define se o botão secundário deve ser exibido
 *
 * @example
 * ```tsx
 * <Dialog
 *   title="Confirmar exclusão"
 *   isOpen={isDialogOpen}
 *   onClose={() => setIsDialogOpen(false)}
 *   onPrimaryClick={() => handleConfirm()}
 *   onSecondaryClick={() => setIsDialogOpen(false)}
 *   primaryLabel="Confirmar"
 *   secondaryLabel="Cancelar"
 * >
 *   Tem certeza que deseja excluir este item?
 * </Dialog>
 * ```
 */
export function Dialog({
  size = "regular",
  type = "default",
  title,
  children,
  isOpen,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel = "Confirmar",
  secondaryLabel = "Cancelar",
  showSecondary = true,
  ...props
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <dialog
        open
        className={`${styles.dialog} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.buttons}>
          {showSecondary && (
            <Button kind="secondary" onClick={onSecondaryClick}>
              {secondaryLabel}
            </Button>
          )}

          <Button
            kind={type === "default" ? "primary" : "critical"}
            onClick={onPrimaryClick}
          >
            {primaryLabel}
          </Button>
        </div>
      </dialog>
    </div>
  );
}
