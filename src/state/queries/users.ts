import { createApi } from '@reduxjs/toolkit/query';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string;
  name: string;
}

type Users = User[];

export const userApi = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  baseQuery: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 3秒待つ
    const users: Users = [
      { id: '1', name: 'abc' },
      { id: '2', name: 'def' },
    ];
    return { data: users };
  },
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => `users`,
    }),
    // getUser: builder.query<User, string>({
    //   query: (userID: string) => `users/${userID}`,
    // }),

    getUsers2: builder.query<Users, void>({
      query: () => `users`,
    }),
  }),
});

// export const userApi2 = createApi({
//   // baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
//   baseQuery: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // 3秒待つ
//     const users: Users = [
//       { id: '1', name: 'abc' },
//       { id: '2', name: 'def' },
//     ];
//     return { data: users };
//   },
//   endpoints: (builder) => ({
//     getUsers2: builder.query<Users, void>({
//       query: () => `users2`,
//     }),
//     // getUser: builder.query<User, string>({
//     //   query: (userID: string) => `users/${userID}`,
//     // }),
//   }),
// });
