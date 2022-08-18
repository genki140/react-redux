// ここでは react関係のモジュールをインポートしない。ロジックのみ考える

import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';
import { userApi } from './queries/users';
import { appInitialState } from './state';

// Sliceの定義。小規模であればSliceは分割の必要なし
export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: actions,
  // extraReducers: (builder) => {
  //   builder.addCase(updateData.fulfilled, (state, action) => {
  //     // state.tasks = action.payload.tasks;
  //   });
  // },
});
export const appActions = appSlice.actions;

// Storeの定義
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // [userApi.reducerPath]: userApi.reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(createRouterMiddleware(history)),

// export const appSlice2 = createSlice({
//   name: 'app2',
//   initialState: appInitialState,
//   reducers: {
//     additional1,
//     additional2,
//   },
// });

// const reducer = combineReducers({
//   router: createRouterReducer(history),
//   app1: appSlice.reducer,
//   app2: appSlice2.reducer,
// });
