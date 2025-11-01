const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function getMonthName(dateString: string): string {
  return MONTHS[new Date(dateString).getMonth()];
}

export function getMonthNameIndex(month: string): number {
  return MONTHS.indexOf(month);
}

export function getYear(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", { year: "numeric" });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getFormattedToday(): string {
  const today = new Date();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatShortTextDate(value: string): string {
  const parsedDate = new Date(
    value.includes("T") ? value : `${value}T00:00:00`
  );

  if (isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}
