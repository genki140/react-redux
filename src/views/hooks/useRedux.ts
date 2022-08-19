// reduxを reactから使うための機能はここに記述する（ロジックテストには使用しない）

import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { AppState } from '../../state/state';
import store, { RootDispatch, appActions } from '../../state/store';
import { showConfirm } from '../../state/thunks';

// アクションをまとめて使いやすくしたhooks
export const useActions = () => {
  const dispatch: RootDispatch = useDispatch();

  // const myDispatch: <T, V>(T) => V =
  //   (thunk: (T)=>V) => dispatch(thunk).unwrap();

  // コンポーネントごとに毎回これを生成するのが重そうであればこの部分だけcontext化＆永続化もあり？
  return useMemo(
    () => ({
      ...bindActionCreators({ ...appActions }, dispatch),
      // updateData: () => dispatch(updateData()),

      // この定義をいちいち書くのは面倒。便利 dispatch を書けると良い。
      // dispatchを渡してこれらを返すような関数をstate側に実装すると、stateとviewで二重に定義しなくてよさそう。
      showConfirm: (params: { title: string; message: string; accept: string; cancel?: string }) =>
        dispatch(showConfirm(params)).unwrap(),

      // showConfirm: myDispatch(showConfirm),
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
) => Selected = (selector) => useReduxSelector((x: RootState) => selector(x.app));
