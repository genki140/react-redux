// reduxを reactから使うための機能はここに記述する（ロジックテストには使用しない）

import { bindActionCreators } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { appSlice, store } from '../../logics/store';

// アクションをまとめて使いやすくしたhooks
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(appSlice.actions, dispatch);
  // return {
  //   app1: bindActionCreators(appSlice.actions, dispatch),
  //   app2: bindActionCreators(appSlice2.actions, dispatch),
  // };
};

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export type AppState = ReturnType<typeof appSlice.reducer>;
// type AppDispatch = typeof store.dispatch;
// export const useDispatch: () => AppDispatch = useReduxDispatch;
// export const actions = appSlice.actions;
