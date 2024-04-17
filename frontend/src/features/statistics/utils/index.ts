export function traduceParameter(name: string) {
  switch (name) {
    case 'Income':
      return 'Revenus';
    case 'Expense':
      return 'Dépenses';
    case 'Balance':
      return 'Solde';
    default:
      return name;
  }
}
