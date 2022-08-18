// reduxを reactから使うための機能はここに記述する（ロジックテストには使用しない）

import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { updateData } from '../../logics/actions';
import { AppState } from '../../logics/state';
import { RootDispatch, appSlice, store } from '../../logics/store';

// アクションをまとめて使いやすくしたhooks
export const useActions = () => {
  const dispatch: RootDispatch = useDispatch();
  return useMemo(
    () => ({
      ...bindActionCreators(appSlice.actions, dispatch),
      updateData: () => dispatch(updateData()),
    }),
    [dispatch]
  );
};

// Selectorに型を付ける
export type RootState = ReturnType<typeof store.getState>;
// export const useSelector = useReduxSelector;

export const useSelector: <Selected>(
  selector: (state: AppState) => Selected
  // equalityFn?: EqualityFn<Selected> | undefined
) => Selected = (selector) =>
  useReduxSelector((x: RootState) => selector(x.app));

// export interface TypedUseSelectorHook<TState> {
//   <TSelected>(selector: (state: TState) => TSelected, equalityFn?: EqualityFn<TSelected>): TSelected;
// }

// return {
//   app1: bindActionCreators(appSlice.actions, dispatch),
//   app2: bindActionCreators(appSlice2.actions, dispatch),
// };
// export type AppState = ReturnType<typeof appSlice.reducer>;
// type AppDispatch = typeof store.dispatch;
// export const useDispatch: () => AppDispatch = useReduxDispatch;
// export const actions = appSlice.actions;
