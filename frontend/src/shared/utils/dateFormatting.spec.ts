import { describe, expect, it } from 'vitest';
import { formatDate, swapDate } from './dateFormatting';

describe('swap date', () => {
  it('should swap date format', () => {
    expect(swapDate('28/04/2024')).toBe('2024/04/28');
    expect(swapDate('28/04')).toBe('04/28');
  });
});

describe('format date', () => {
  it('should format date with day and month only', () => {
    expect(formatDate('2024/04/28')).toBe('28 avril');
    expect(formatDate('04/28')).toBe('28 avril');
  });
});
