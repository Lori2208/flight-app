import { useCallback } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Placeholder } from '@/components/Placeholder';
import { useFavorites } from '@/features/favorites/useFavorites';
import { FlightCard } from '@/features/flights/components/FlightCard';
import { useSearchFlightsQuery } from '@/features/flights/flightsApi';
import type { HomeScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { formatLongDate } from '@/utils/date';

export function SearchResultsScreen({ navigation, route }: HomeScreenProps<'SearchResults'>) {
  const { search } = route.params;
  const { colors } = useAppTheme();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const {
    data: flights = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useSearchFlightsQuery(search);

  const handleOpenFlight = useCallback(
    (flight: Flight) => navigation.navigate('FlightDetails', { flightId: flight.id }),
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <Placeholder title="Couldn't load flights">
        <Button title="Try again" onPress={refetch} color={colors.primary} />
      </Placeholder>
    );
  }

  return (
    <FlatList
      data={flights}
      extraData={favorites}
      keyExtractor={(flight) => String(flight.id)}
      renderItem={({ item }) => (
        <FlightCard
          flight={item}
          onPress={handleOpenFlight}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        flights.length > 0 ? (
          <Text style={[styles.header, { color: colors.textSecondary }]}>
            {flights.length} {flights.length === 1 ? 'flight' : 'flights'} ·{' '}
            {formatLongDate(search.departureDate)}
          </Text>
        ) : undefined
      }
      ListEmptyComponent={
        <Placeholder title="No flights found">
          <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Try another date or route.
          </Text>
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
});