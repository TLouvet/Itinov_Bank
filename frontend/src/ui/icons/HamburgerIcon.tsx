import { BaseIcon } from './BaseIcon';

export function HamburgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon width='800px' height='800px' viewBox='0 0 24 24' {...props}>
      <path d='M4 18L20 18' strokeWidth='2' strokeLinecap='round' />
      <path d='M4 12L20 12' strokeWidth='2' strokeLinecap='round' />
      <path d='M4 6L20 6' strokeWidth='2' strokeLinecap='round' />
    </BaseIcon>
  );
}
