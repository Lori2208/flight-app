import { api } from '@/services/api';
import type { Flight, SearchParams } from '@/types';

export const flightsApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchFlights: build.query<Flight[], SearchParams>({
      query: ({ origin, destination, departureDate }) => ({
        url: '/flights',
        params: {
          origin,
          destination,
          departureTime_like: departureDate,
          _sort: 'departureTime',
          _order: 'asc',
        },
      }),
    }),

    getFlight: build.query<Flight, number>({
      query: (id) => `/flights/${id}`,
    }),
  }),
});

export const { useSearchFlightsQuery, useGetFlightQuery } = flightsApi;
