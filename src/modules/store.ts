import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { bindActionCreators } from 'redux';

// Sliceの定義。小規模であればSliceは分割の必要なし
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    count: 0,
  },
  reducers: {
    additional: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.count += action.payload;
    },
    subtraction: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.count -= action.payload;
    },
  },
});

// Storeの定義
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => AppDispatch = useReduxDispatch;

export const actions = appSlice.actions;

//export const { additional, subtraction } = appSlice.actions;

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(appSlice.actions, dispatch);
};
