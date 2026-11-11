import { api } from '@/services/api';
import type { RootState } from '@/app/store';
import type { RecentSearch, SearchParams } from '@/types';
import { getSearchesToDelete, isSameSearch, MAX_RECENT_SEARCHES } from '../helper/recentSearchUtils';

type AddRecentSearchArg = SearchParams & { userId: number };

const recentSearchesQueryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecentSearches: build.query<RecentSearch[], number>({
      query: (userId) => ({
        url: '/recentSearches',
        params: { userId, _sort: 'createdAt', _order: 'desc', _limit: MAX_RECENT_SEARCHES },
      }),
      providesTags: ['RecentSearches'],
    }),
  }),
});


function selectCachedSearches(state: RootState, userId: number): RecentSearch[] | undefined {
  return recentSearchesQueryApi.endpoints.getRecentSearches.select(userId)(state).data;
}


export const recentSearchesApi = recentSearchesQueryApi.injectEndpoints({
  endpoints: (build) => ({
    addRecentSearch: build.mutation<RecentSearch, AddRecentSearchArg>({
      async queryFn(arg, { getState }, _extraOptions, baseQuery) {
        let existing = selectCachedSearches(getState() as RootState, arg.userId);

        if (!existing) {
          const result = await baseQuery({
            url: '/recentSearches',
            params: { userId: arg.userId, _sort: 'createdAt', _order: 'desc' },
          });
          if (result.error) return { error: result.error };
          existing = result.data as RecentSearch[];
        }

        const toDelete = getSearchesToDelete(existing, arg);
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

      // After the POST succeeds, put the new search on top of the cached list
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            recentSearchesQueryApi.util.updateQueryData(
              'getRecentSearches',
              arg.userId,
              (draft) => {
                const others = draft.filter((search) => !isSameSearch(search, arg));
                return [created, ...others].slice(0, MAX_RECENT_SEARCHES);
              },
            ),
          );
        } catch {
        }
      },
    }),
  }),
});

export const { useGetRecentSearchesQuery, useAddRecentSearchMutation } = recentSearchesApi;