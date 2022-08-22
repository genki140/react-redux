import { createApi } from '@reduxjs/toolkit/query/react';
import { sleep } from '../../utils/promise';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string;
  name: string;
}

type Users = User[];

export const api = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://example.com/api/v2/' }),
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // 3秒待つ
  // const users: Users = [
  //   { id: '1', name: 'abc' },
  //   { id: '2', name: 'def' },
  // ];
  // return { data: users };
  // },

  // ベースクエリは使わない方向
  baseQuery: () => ({ data: null }),

  // ここに各関数を記述
  endpoints: (builder) => ({
    getUsers: builder.query<Users, unknown>({
      queryFn: async () => {
        console.log('fetch users');
        await sleep(1000);
        return {
          data: [
            { id: '1', name: '鈴木一郎' },
            { id: '2', name: '田中次郎' },
            { id: '3', name: '佐藤三郎' },
            { id: '4', name: '伊東四朗' },
          ],
        };
      },

      // transformResponse: (response: Users[]) =>
      //   response.reduce((acc: Users, curr: User) => {
      //     acc[curr.id] = curr;
      //     return acc;
      //   }, {}),
    }),

    // getUser: builder.query<User, string>({
    //   query: (userID: string) => `users/${userID}`,
    // }),

    // getUsers2: builder.query<Users, void>({
    //   query: () => `users`,
    // }),
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
