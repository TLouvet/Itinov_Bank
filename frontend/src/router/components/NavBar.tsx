import { useLocation } from 'react-router-dom';
import { NavLink } from './NavLink';
import { navLinks } from '../nav.data';
import { useState } from 'react';
import clsx from 'clsx';
import { HamburgerIcon } from '../../ui/icons/HamburgerIcon';

export function Navbar() {
  const url = useLocation();
  const [active, setActive] = useState(false);

  return (
    <>
      <button className='absolute right-4 top-3 lg:hidden' onClick={() => setActive(true)}>
        <HamburgerIcon width={40} height={40} className='stroke-primary' />
      </button>
      {active && (
        <div
          className='fixed lg:hidden top-0 bottom-0 left-0 right-0 z-10 bg-opacity-30 bg-gray-700'
          onClick={() => setActive(false)}
        />
      )}
      <nav
        className={clsx(
          'bg-gray-800 min-w-64 w-2/12',
          { hidden: !active },
          { 'w-full sm:w-auto fixed top-0 bottom-0 right-0 z-20 animate-rtl': active },
          'lg:block lg:static'
        )}
      >
        <div className='container mx-auto flex justify-between items-center flex-col mb-10 p-4 sm:p-6'>
          <div className='text-primary font-bold mb-5'>Itinov Bank</div>
          <img
            src='https://avatars.githubusercontent.com/u/77491398?v=4'
            alt='logo'
            className='rounded-full w-20 h-20 mb-3'
          />
          <div className='text-white font-bold'>Mr. Doe John</div>
        </div>
        <ul className='container mx-auto flex items-start flex-col sticky top-24'>
          {navLinks.map(({ to, label, Icon }) => (
            <li
              key={`nav-${label}`}
              className={clsx('ps-4 flex gap-4 min-h-14 place-items-center w-full hover:bg-primary', {
                'bg-primary': url.pathname === to,
              })}
            >
              <NavLink
                to={to}
                label={label}
                active={url.pathname === to}
                Icon={<Icon fill='white' className='h-7 w-7' />}
                key={to}
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
