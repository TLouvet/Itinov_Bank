import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

export function addTwo(a: number, b: number): number {
  return a + b;
}

function HelloWorld() {
  return <h1>Hello World</h1>;
}

describe('add', {}, () => {
  test('should add two numbers', () => {
    expect(addTwo(1, 2)).toBe(3);
  });
});

describe('Hello World', {}, () => {
  test("should render 'Hello World'", async () => {
    render(<HelloWorld />);

    expect(screen.getByRole('heading')).toHaveTextContent('Hello World');
  });
});
