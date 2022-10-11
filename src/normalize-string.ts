export function normalizeString(str: any): string {
  return String(str ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
