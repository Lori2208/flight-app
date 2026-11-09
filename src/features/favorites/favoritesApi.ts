import { api } from '@/services/api';
import type { Favorite } from '@/types';

type AddFavoriteArg = { userId: number; flightId: number };
type RemoveFavoriteArg = { id: number; userId: number };

export const favoritesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFavorites: build.query<Favorite[], number>({
      query: (userId) => ({
        url: '/favorites',
        params: { userId, _expand: 'flight', _sort: 'id', _order: 'desc' },
      }),
      providesTags: ['Favorites'],
    }),

    addFavorite: build.mutation<Favorite, AddFavoriteArg>({
      query: (body) => ({ url: '/favorites', method: 'POST', body }),
      async onQueryStarted({ userId, flightId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          favoritesApi.util.updateQueryData('getFavorites', userId, (draft) => {
            draft.unshift({ id: -flightId, userId, flightId });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo(); 
        }
      },
      invalidatesTags: ['Favorites'],
    }),

    removeFavorite: build.mutation<void, RemoveFavoriteArg>({
      query: ({ id }) => ({ url: `/favorites/${id}`, method: 'DELETE' }),
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          favoritesApi.util.updateQueryData('getFavorites', userId, (draft) =>
            draft.filter((favorite) => favorite.id !== id),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } =
  favoritesApi;