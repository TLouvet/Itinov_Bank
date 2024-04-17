import { BaseIcon } from './BaseIcon';

export function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon width='800px' height='800px' viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.0606 11.9999L15.5303 17.4696L14.4696 18.5303L7.93928 11.9999L14.4696 5.46961L15.5303 6.53027L10.0606 11.9999Z'
      />
    </BaseIcon>
  );
}
