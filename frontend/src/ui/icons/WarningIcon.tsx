import { BaseIcon } from './BaseIcon';

export function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon width='800px' height='800px' stroke='#f87171' viewBox='0 0 512 512' {...props}>
      <path
        fill='none'
        stroke='#f87171'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z'
      />
      <path
        d='M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z'
        fill='none'
        stroke='#f87171'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />

      <path d='M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z' fill='#f87171' />
    </BaseIcon>
  );
}
