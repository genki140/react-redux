import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { combineReducers, bindActionCreators } from 'redux';

//初期値の定義。
const appInitialState = {
  count1: 0,
  count2: 0,
};
type AppState = typeof appInitialState;

// アクションの定義
const additional1 = (state: AppState, { payload }: PayloadAction<number>) => {
  if (Number.isNaN(payload)) return;
  state.count1 += payload;
};
const additional2 = (state: AppState, { payload }: PayloadAction<number>) => {
  if (Number.isNaN(payload)) return;
  state.count2 += payload;
};

// Sliceの定義。小規模であればSliceは分割の必要なし
export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    additional1,
    additional2,
  },
});

export const appSlice2 = createSlice({
  name: 'app2',
  initialState: appInitialState,
  reducers: {
    additional1,
    additional2,
  },
});

const reducer = combineReducers({
  app1: appSlice.reducer,
  app2: appSlice2.reducer,
});

// Storeの定義
export const store = configureStore({
  reducer,
});

// アクションをまとめて使いやすくしたhooks
export const useActions = () => {
  const dispatch = useDispatch();
  return {
    app1: bindActionCreators(appSlice.actions, dispatch),
    app2: bindActionCreators(appSlice2.actions, dispatch),
  };
};

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export type AppState = ReturnType<typeof appSlice.reducer>;
// type AppDispatch = typeof store.dispatch;
// export const useDispatch: () => AppDispatch = useReduxDispatch;
// export const actions = appSlice.actions;
