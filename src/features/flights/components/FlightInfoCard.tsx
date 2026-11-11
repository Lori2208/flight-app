import { Card } from './Card';
import type { Flight } from '@/types';
import { InfoRow } from './InfoRow';

type Props = { flight: Flight; duration: string };

export function FlightInfoCard({ flight, duration }: Props) {
  return (
    <Card>
      <InfoRow icon="airplane-outline" label="Aircraft" value={flight.aircraft} />
      <InfoRow icon="business-outline" label="Terminal" value={flight.terminal} />
      <InfoRow icon="enter-outline" label="Gate" value={flight.gate} />
      <InfoRow icon="time-outline" label="Duration" value={duration} />
      <InfoRow icon="pricetag-outline" label="Price" value={`€${flight.price}`} />
    </Card>
  );
}