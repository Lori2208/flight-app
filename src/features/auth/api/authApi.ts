import { api } from '@/services/api';
import type { User } from '@/types';

type Credentials = { email: string; password: string };
type UserRecord = User & { password: string };

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<User, Credentials>({
      async queryFn({ email, password }, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/users',
          params: { email: email.trim().toLowerCase(), password },
        });

        if (result.error) return { error: result.error };

        const record =
          Array.isArray(result.data) && result.data.length > 0
            ? (result.data[0] as UserRecord)
            : undefined;

        if (!record) {
          return { error: { status: 401, data: 'Invalid email or password' } };
        }

        const user: User = {
          id: record.id,
          email: record.email,
          name: record.name,
          avatar: record.avatar,
        };
        return { data: user };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;