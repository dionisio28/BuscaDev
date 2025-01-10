export function formatNumber(value: number): string {
  if (value < 1000) {
    return value.toString();
  }

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let tier = Math.floor(Math.log10(value) / 3);
  let scaled = value / Math.pow(10, tier * 3);
  let formatted = scaled.toFixed(1);

  if (formatted.endsWith('.0')) {
    formatted = formatted.slice(0, -2);
  }

  return `${formatted}${suffixes[tier]}`;
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}
