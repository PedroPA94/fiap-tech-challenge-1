import { useId } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelColor?: "text-primary" | "text-dark" | "text-light";
  hint?: string;
  error?: boolean;
}

/**
 * Componente de input de texto com label, hint e suporte a validação de erro.
 *
 * @param props - Propriedades do componente
 * @param props.label - Texto do label associado ao input
 * @param props.placeholder - Texto placeholder do input
 * @param props.hint - Texto de dica ou instrução exibido abaixo do input
 * @param props.required - Define se o input é obrigatório
 * @param props.error - Define se o input está em estado de erro
 * @param props.type - Tipo do input HTML
 *
 * @example
 * ```tsx
 * <Input
 *   label="Nome completo"
 *   placeholder="Digite seu nome"
 *   hint="Informe seu nome completo"
 *   required
 *   error={nameError}
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 * ```
 */
export function Input({
  label,
  labelColor = "text-dark",
  hint,
  error,
  required,
  type = "text",
  placeholder = "Placeholder",
  ...props
}: InputProps) {
  const inputId = useId();
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={inputId} className={`${styles.label} ${labelColor}`}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <input
        id={inputId}
        type={type}
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        placeholder={placeholder}
        required={required}
        aria-describedby={hintId}
        aria-invalid={error || undefined}
        {...props}
      />

      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
}
