import clsx from 'clsx';
import { Link } from 'react-router-dom';

type NavLinkProps = Readonly<{
  to: string;
  label: string;
  active: boolean;
  Icon: JSX.Element;
}>;

export function NavLink({ to, label, active, Icon }: NavLinkProps) {
  return (
    <>
      {Icon}
      <Link
        to={to}
        className={clsx('text-white w-full pe-4 sm:pe-6 self-stretch flex items-center', { 'font-bold': active })}
      >
        {label}
      </Link>
    </>
  );
}
