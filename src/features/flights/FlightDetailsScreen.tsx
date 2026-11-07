import { useRoute, type RouteProp } from '@react-navigation/native';
import { Placeholder } from '@/components/Placeholder';
import type { FlightDetailsParams } from '@/navigation/types';

export function FlightDetailsScreen() {
  const { params } = useRoute<RouteProp<{ FlightDetails: FlightDetailsParams }, 'FlightDetails'>>();
  return <Placeholder title={`Flight details #${params.flightId}`} />;
}