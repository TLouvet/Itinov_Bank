import { describe, expect, it } from 'vitest';
import { currencyFormatter } from './currencyFormatting';

describe('currency formatting', () => {
  it('should format euro currency with french format by default', () => {
    expect(currencyFormatter('EUR').format(1234.56)).toEqual(
      new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(1234.56)
    );
  });

  it('should accept locale as parameter', () => {
    expect(currencyFormatter('EUR', 'en-US').format(1234.56)).toBe('€1,234.56');
  });
});
