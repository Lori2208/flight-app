import { Button } from 'react-native';
import { Placeholder } from '@/components/Placeholder'
import type { HomeScreenProps } from '@/navigation/types';

export function SearchResultsScreen({ navigation }: HomeScreenProps<'SearchResults'>) {
  return (
    <Placeholder title="Search results">
      <Button
        title="Test: open flight 1"
        onPress={() => navigation.navigate('FlightDetails', { flightId: 1 })}
      />
    </Placeholder>
  );
}