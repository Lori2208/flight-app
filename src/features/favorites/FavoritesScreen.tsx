import { Button } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import type { FavoritesScreenProps } from '@/navigation/types';

export function FavoritesScreen({ navigation }: FavoritesScreenProps<'Favorites'>) {
  return (
    <Placeholder title="Favorite flights">
      <Button
        title="Test open flight 2"
        onPress={() => navigation.navigate('FlightDetails', { flightId: 2 })}
      />
    </Placeholder>
  );
}