import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import content from '../content.json';

export function DashboardAgencyContact() {
  return (
    <>
      <SecondaryTitle>{content.agency.title}</SecondaryTitle>
      <div>
        <p>Agence Levallois</p>
        <p>92300 Levallois-Perret</p>
        <p>38 Rue Victor Hugo</p>
        <p>01 23 45 67 89</p>
      </div>
    </>
  );
}
