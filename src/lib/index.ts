// place files you want to import through the `$lib` alias in this folder.
export function capitalizeFirstLetterLocale(str: string, locale?: string): string {
    if (!str) return str;
    return str.charAt(0).toLocaleUpperCase(locale) + str.slice(1);
}