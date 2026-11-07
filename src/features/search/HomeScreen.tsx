import { Button } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import type { HomeScreenProps } from '@/navigation/types';

export function HomeScreen({ navigation }: HomeScreenProps<'Home'>) {
  return (
    <Placeholder title="Home">
      <Button
        title="Test: search TIA → FCO"
        onPress={() =>
          navigation.navigate('SearchResults', {
            search: {
              origin: 'TIA',
              destination: 'FCO',
              departureDate: '2026-11-20',
              arrivalDate: '2026-11-25',
            },
          })
        }
      />
    </Placeholder>
  );
}