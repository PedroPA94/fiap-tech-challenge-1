import { DropdownMenu } from "./DropdownMenu/DropdownMenu";
import { DropdownItemProps } from "./DropdownItem/DropdownItem";

import { useEffect, useRef, useState } from "react";
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

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <label className={styles.label} id="dropdown-label">
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        className={styles.dropdownButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
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
          tabIndex={-1}
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
