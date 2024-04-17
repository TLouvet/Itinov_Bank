import { currencyFormatter } from '@/shared/utils/currencyFormatting';
import clsx from 'clsx';

type AmountProps = Readonly<{
  value: number | string;
}>;

export function Amount({ value }: AmountProps) {
  const valueAsNumber = typeof value === 'string' ? parseFloat(value) : value;
  const isPositive = valueAsNumber > 0;
  const isNegative = valueAsNumber < 0;
  const formattedValue = currencyFormatter('EUR').format(valueAsNumber);

  return (
    <p
      className={clsx('font-semibold', {
        'text-green-400': isPositive,
        'text-error': isNegative,
        'text-black': !isPositive && !isNegative,
      })}
    >
      {isPositive && '+'} {formattedValue}
    </p>
  );
}
