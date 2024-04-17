import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { Navbar } from './NavBar';
import { navLinks } from '../nav.data';

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('should render a nav element', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render links from the nav data ', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(navLinks.length);
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const textContent = link.textContent;
      const navLink = navLinks.find((navLink) => navLink.to === href);
      expect(navLink).toBeDefined();
      expect(navLink?.label).toBe(textContent);
    });
  });
});
