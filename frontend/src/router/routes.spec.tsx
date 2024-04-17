import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

const memoryRouter = createMemoryRouter(givenMockRoutes());

describe('Router', () => {
  it('should render correctly', () => {
    render(<RouterProvider router={memoryRouter} />);
  });

  it('should render the HomePage', () => {
    memoryRouter.navigate(ROUTES.HOME);
    render(<RouterProvider router={memoryRouter} />);
    expect(document.body).toHaveTextContent('HomePage');
  });

  it('should render the SinglePage', () => {
    memoryRouter.navigate(ROUTES.HISTORY);
    render(<RouterProvider router={memoryRouter} />);
    expect(document.body).toHaveTextContent('SinglePage');
  });

  it('should render the DepositPage', () => {
    memoryRouter.navigate(ROUTES.DEPOSIT);
    render(<RouterProvider router={memoryRouter} />);
    expect(document.body).toHaveTextContent('DepositPage');
  });

  it('should render the WithdrawPage', () => {
    memoryRouter.navigate(ROUTES.WITHDRAW);
    render(<RouterProvider router={memoryRouter} />);
    expect(document.body).toHaveTextContent('WithdrawPage');
  });

  it('should render the TransferPage', () => {
    memoryRouter.navigate(ROUTES.TRANSFER);
    render(<RouterProvider router={memoryRouter} />);
    expect(document.body).toHaveTextContent('TransferPage');
  });
});

function givenMockRoutes() {
  return [
    {
      path: ROUTES.HOME,
      element: <>HomePage</>,
    },
    {
      path: ROUTES.HISTORY,
      element: <>SinglePage</>,
    },
    {
      path: ROUTES.DEPOSIT,
      element: <>DepositPage</>,
    },
    {
      path: ROUTES.WITHDRAW,
      element: <>WithdrawPage</>,
    },
    {
      path: ROUTES.TRANSFER,
      element: <>TransferPage</>,
    },
  ];
}
