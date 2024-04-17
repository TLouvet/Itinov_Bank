import { BaseIcon } from './BaseIcon';

export function HistoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon width='800px' height='800px' viewBox='0 0 1024 1024' {...props}>
      <path d='M320 89.6h640v76.8H320V89.6z m0 768h640v76.8H320v-76.8z m-256-768h128v76.8H64V89.6z m256 384h640v76.8H320V473.6z m-256 0h128v76.8H64V473.6z m0 384h128v76.8H64v-76.8z' />
    </BaseIcon>
  );
}
