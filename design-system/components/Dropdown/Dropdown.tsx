"use client";

import { DropdownMenu } from "./DropdownMenu/DropdownMenu";
import { DropdownItemProps } from "./DropdownItem/DropdownItem";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

interface DropdownProps {
  label: string;
  placeholder?: string;
  options: DropdownItemProps[];
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
}

/**
 * Componente de dropdown customizado com comportamento similar a um select HTML.
 *
 * @param props - Propriedades do componente
 * @param props.label - Texto do label associado ao dropdown
 * @param props.placeholder - Texto placeholder exibido quando nenhuma opção está selecionada
 * @param props.options - Array de opções do dropdown, cada uma com `value` e `content`
 * @param props.value - Valor selecionado do dropdown (controlado)
 * @param props.onChange - Função chamada ao selecionar uma opção, recebe o `value` selecionado
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: "1", content: "Opção 1" },
 *   { value: "2", content: "Opção 2" },
 *   { value: "3", content: "Opção 3" }
 * ];
 *
 * <Dropdown
 *   label="Escolha uma opção"
 *   placeholder="Selecione..."
 *   options={options}
 *   value={selectedOption}
 *   onChange={(value) => setSelectedOption(value)}
 * />
 * ```
 */
export function Dropdown({
  label,
  placeholder,
  options,
  value: controlledValue,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(controlledValue ?? "");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string | number | undefined) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
    buttonRef.current?.focus(); // Acessibilidade
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(null); // Acessibilidade
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Acessibilidade ===

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Navegação via teclado
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Abrir menu
    if (!isOpen) {
      if (
        event.key === "ArrowDown" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    // Fechar menu
    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(null);
      buttonRef.current?.focus();
    }

    // Navegar entre opções
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev === options.length - 1 ? 0 : prev + 1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null || prev === 0 ? options.length - 1 : prev - 1
      );
    }

    // Selecionar opção
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (highlightedIndex !== null) {
        handleSelect(options[highlightedIndex].value);
      }
    }
  };

  const labelId = useId();

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <label className={styles.label} id={labelId}>
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        className={styles.dropdownButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHighlightedIndex(0);
        }}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedOption?.content ?? (placeholder || "Select")}</span>
        <Icon
          path={isOpen ? mdiChevronUp : mdiChevronDown}
          size={1}
          className={styles.chevronIcon}
        />
      </button>

      {isOpen && (
        <div
          className={styles.dropdownMenuWrapper}
          role="listbox"
          tabIndex={0}
          aria-activedescendant={
            highlightedIndex !== null
              ? `dropdown-item-${highlightedIndex}`
              : undefined
          }
        >
          <DropdownMenu
            options={options.map((opt, idx) => ({
              ...opt,
              id: `dropdown-item-${idx}`,
              onClick: () => handleSelect(opt.value),
              isHighlighted: highlightedIndex === idx,
            }))}
          />
        </div>
      )}
    </div>
  );
}
