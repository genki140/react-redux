// ここでは react関係のモジュールをインポートしない。ロジックのみ考える

import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';
import { appInitialState } from './state';

// Sliceの定義。小規模であればSliceは分割の必要なし
export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: actions,
});

// Storeの定義
export const store = configureStore({
  reducer: appSlice.reducer,
});

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
