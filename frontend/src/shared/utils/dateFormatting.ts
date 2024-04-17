/**
 * Swap date format
 * @example 01/01/2021 => 2021/01/01
 * @example  28/04 => 04/28
 */
export const swapDate = (ddMMDate: string) => ddMMDate.split('/').reverse().join('/');

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long' }).format(new Date(date));
