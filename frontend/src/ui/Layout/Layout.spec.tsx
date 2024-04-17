import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout', () => {
  const title = 'HomePageTitle';

  it('should have the title props as the page title', () => {
    render(
      <MemoryRouter>
        <Layout pageTitle={title}>
          <div>My Content</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });
});
