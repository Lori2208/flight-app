import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Placeholder } from '@/components/Placeholder';
import { FlightCard } from '@/features/flights/components/FlightCard';
import type { FavoritesScreenProps } from '@/navigation/types';
import { useAppTheme } from '@/theme/useAppTheme';
import type { Flight } from '@/types';
import { useFavorites } from './hooks/useFavorites';
import { FavoritesHeader } from './components/FavoritesHeader';
import { FavoritesEmpty } from './components/FavoritesEmpty';

export function FavoritesScreen({ navigation }: FavoritesScreenProps<'Favorites'>) {
  const { colors } = useAppTheme();
  const rootNavigation = useNavigation();
  const { favorites, toggleFavorite, isLoading, isFetching, isError, refetch } = useFavorites();
  const [pendingRemoval, setPendingRemoval] = useState<Flight | null>(null);

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

  const handleRemove = useCallback((flight: Flight) => setPendingRemoval(flight), []);

  const confirmRemove = () => {
    if (pendingRemoval) toggleFavorite(pendingRemoval);
    setPendingRemoval(null);
  };

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
    <>
      <FlatList
        data={flights}
        keyExtractor={(flight) => String(flight.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={<View style={styles.separator} />}
        ListHeaderComponent={
  flights.length > 0 ? <FavoritesHeader count={flights.length} /> : undefined
}
ListEmptyComponent={<FavoritesEmpty onSearchPress={goToSearch} />}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
      />

      <ConfirmDialog
        visible={pendingRemoval !== null}
        icon="heart-dislike-outline"
        title="Remove favorite?"
        message={
          pendingRemoval
            ? `${pendingRemoval.flightNumber} will be removed from your favorite flights.`
            : ''
        }
        confirmLabel="Remove"
        destructive
        onConfirm={confirmRemove}
        onCancel={() => setPendingRemoval(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: 16, flexGrow: 1 },
  separator: { height: 12 },
  header: { fontSize: 14, marginBottom: 12 },
  emptyText: { textAlign: 'center' },
});
