export function formatYear(year: number, lang: 'en' | 'fa'): string {
  const absYear = Math.abs(year);
  if (lang === 'fa') {
    return year < 0 ? `${absYear} ق.م` : `${absYear} م`;
  }
  return year < 0 ? `${absYear} BC` : `${absYear} AD`;
}

export function formatRange(start: number, end: number | null, lang: 'en' | 'fa'): string {
  if (end === null) return formatYear(start, lang);
  return `${formatYear(start, lang)} – ${formatYear(end, lang)}`;
}
