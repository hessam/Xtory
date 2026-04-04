const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(n: number | string): string {
  return n.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
}

export function formatYear(year: number, lang: 'en' | 'fa'): string {
  const absYear = Math.abs(year);
  if (lang === 'fa') {
    // User requested Persian numerals for scrubber and timeline
    return year < 0 ? `${toPersianDigits(absYear)} ق.م` : `${toPersianDigits(absYear)} م`;
  }
  return year < 0 ? `${absYear} BC` : `${absYear} AD`;
}

export function formatDuration(years: number, lang: 'en' | 'fa'): string {
  if (lang === 'fa') {
    return `${toPersianDigits(years)} سال`;
  }
  return `${years} yrs`;
}

export function formatRange(start: number, end: number | null, lang: 'en' | 'fa'): string {
  if (end === null) return formatYear(start, lang);
  return `${formatYear(start, lang)} – ${formatYear(end, lang)}`;
}
