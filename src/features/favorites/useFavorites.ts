import { skipToken } from '@reduxjs/toolkit/query/react';
import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import type { Flight } from '@/types';
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from './favoritesApi';

export function useFavorites() {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;

  const query = useGetFavoritesQuery(userId ?? skipToken);
  const favorites = useMemo(() => query.data ?? [], [query.data]);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // flightId → favorite, for fast "is this flight a favorite?" checks
  const favoriteByFlightId = useMemo(
    () => new Map(favorites.map((favorite) => [favorite.flightId, favorite])),
    [favorites],
  );

  const isFavorite = useCallback(
    (flightId: number) => favoriteByFlightId.has(flightId),
    [favoriteByFlightId],
  );

  const toggleFavorite = useCallback(
    (flight: Flight) => {
      if (!userId) return;
      const existing = favoriteByFlightId.get(flight.id);

      if (existing) {
        if (existing.id < 0) return; // still saving, ignore the tap
        removeFavorite({ id: existing.id, userId })
          .unwrap()
          .catch((err) => console.warn('Removing favorite failed:', err));
      } else {
        addFavorite({ userId, flightId: flight.id })
          .unwrap()
          .catch((err) => console.warn('Adding favorite failed:', err));
      }
    },
    [userId, favoriteByFlightId, addFavorite, removeFavorite],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}