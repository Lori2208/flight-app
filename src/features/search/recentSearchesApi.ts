import { api } from '@/services/api';
import type { RecentSearch, SearchParams } from '@/types';
import { getSearchesToDelete, MAX_RECENT_SEARCHES } from './recentSearchUtils';

type AddRecentSearchArg = SearchParams & { userId: number };

export const recentSearchesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecentSearches: build.query<RecentSearch[], number>({
      query: (userId) => ({
        url: '/recentSearches',
        params: { userId, _sort: 'createdAt', _order: 'desc', _limit: MAX_RECENT_SEARCHES },
      }),
      providesTags: ['RecentSearches'],
    }),

    addRecentSearch: build.mutation<RecentSearch, AddRecentSearchArg>({
      async queryFn(arg, _api, _extraOptions, baseQuery) {
        const existing = await baseQuery({
          url: '/recentSearches',
          params: { userId: arg.userId, _sort: 'createdAt', _order: 'desc' },
        });
        if (existing.error) return { error: existing.error };

        const toDelete = getSearchesToDelete(existing.data as RecentSearch[], arg);
        await Promise.all(
          toDelete.map((search) =>
            baseQuery({ url: `/recentSearches/${search.id}`, method: 'DELETE' }),
          ),
        );

        const created = await baseQuery({
          url: '/recentSearches',
          method: 'POST',
          body: { ...arg, createdAt: new Date().toISOString() },
        });
        if (created.error) return { error: created.error };

        return { data: created.data as RecentSearch };
      },
      invalidatesTags: ['RecentSearches'],
    }),
  }),
});

export const { useGetRecentSearchesQuery, useAddRecentSearchMutation } = recentSearchesApi;