import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Amount } from './Amount';

describe('Amount', () => {
  it('should render correctly with a negative value', () => {
    render(<Amount value={-100} />);
    const paragraph = document.querySelector('p');
    expect(paragraph).toHaveClass('text-error');
    // your test code here
  });

  it('should render correctly with a zero value', () => {
    render(<Amount value={0} />);
    const paragraph = document.querySelector('p');
    expect(paragraph).toHaveClass('text-black');
  });

  it('should render correctly a float 0', () => {
    render(<Amount value={0.0} />);
    const paragraph = document.querySelector('p');
    expect(paragraph).toHaveClass('text-black');
  });

  it('should render even with a string number', () => {
    render(<Amount value='150' />);
    const paragraph = document.querySelector('p');
    expect(paragraph).toHaveClass('text-green-400');
  });

  it('should render correctly with a positive value', () => {
    render(<Amount value={100} />);

    // Find the p element
    const paragraph = document.querySelector('p');
    expect(paragraph).toHaveClass('text-green-400');
  });
});
