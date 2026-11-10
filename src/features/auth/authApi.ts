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
          params: { email: email.trim().toLowerCase() },
        });

        if (result.error) return { error: result.error };

        const record = (result.data as UserRecord[])[0];
        if (!record || record.password !== password) {
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
