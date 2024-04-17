export const currencyFormatter = (currency: string, locale = 'fr-FR') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
