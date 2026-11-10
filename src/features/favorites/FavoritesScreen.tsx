import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import { FlightCard } from '@/features/flights/components/FlightCard';
import type { FavoritesScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { useFavorites } from './useFavorites';

export function FavoritesScreen({ navigation }: FavoritesScreenProps<'Favorites'>) {
  const { colors } = useAppTheme();
  const rootNavigation = useNavigation();
  const { favorites, toggleFavorite, isLoading, isFetching, isError, refetch } = useFavorites();

  const flights = useMemo(
    () =>
      favorites
        .map((favorite) => favorite.flight)
        .filter((flight): flight is Flight => flight !== undefined),
    [favorites],
  );

  const handleOpenFlight = useCallback(
    (flight: Flight) => navigation.navigate('FlightDetails', { flightId: flight.id }),
    [navigation],
  );

  const handleRemove = useCallback(
    (flight: Flight) => {
      Alert.alert('Remove favorite', `Remove ${flight.flightNumber} from your favorites?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => toggleFavorite(flight) },
      ]);
    },
    [toggleFavorite],
  );

  const renderItem = useCallback<ListRenderItem<Flight>>(
    ({ item }) => (
      <FlightCard
        flight={item}
        onPress={handleOpenFlight}
        isFavorite
        onToggleFavorite={handleRemove}
      />
    ),
    [handleOpenFlight, handleRemove],
  );

  const goToSearch = () =>
    rootNavigation.navigate('Main', { screen: 'HomeTab', params: { screen: 'Home' } });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <Placeholder title="Couldn't load favorites">
        <Button title="Try again" onPress={refetch} color={colors.primary} />
      </Placeholder>
    );
  }

  return (
    <FlatList
      data={flights}
      keyExtractor={(flight) => String(flight.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        flights.length > 0 ? (
          <Text style={[styles.header, { color: colors.textSecondary }]}>
            {flights.length} saved {flights.length === 1 ? 'flight' : 'flights'}
          </Text>
        ) : undefined
      }
      ListEmptyComponent={
        <Placeholder title="No favorite flights yet">
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Tap the heart on a flight to save it here.
          </Text>
          <Button title="Search flights" onPress={goToSearch} color={colors.primary} />
        </Placeholder>
      }
      refreshing={isFetching && !isLoading}
      onRefresh={refetch}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: 16, flexGrow: 1 },
  separator: { height: 12 },
  header: { fontSize: 14, marginBottom: 12 },
  emptyText: { textAlign: 'center' },
});

function Separator() {
  return <View style={styles.separator} />;
}
