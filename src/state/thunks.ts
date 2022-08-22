// アクションを実行したり連結したりする。
// logicsへのアクセスも、この階層でのみ行うこととする。

import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { diff } from 'deep-object-diff';
import { sleep } from '../utils/promise';
import { api } from './queries/users';
import { appActions, RootDispatch, RootState } from './store';

// 非同期アクションの定義テスト
export function createAppAsyncThunk<Returned, ThunkArg>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, { dispatch: RootDispatch; state: RootState }>,
  options?: AsyncThunkOptions<ThunkArg>
): AsyncThunk<Returned, ThunkArg, { dispatch: RootDispatch; state: RootState }> {
  return createAsyncThunk<Returned, ThunkArg, { dispatch: RootDispatch; state: RootState }>(
    'app/' + typePrefix,
    payloadCreator
  );
}

export const showConfirm = createAppAsyncThunk(
  'showConfirm',
  async (params: { title: string; message: string; accept: string; cancel?: string }, { dispatch, getState }) => {
    dispatch(appActions.openConfirm(params));

    // このステート監視なんとかならないか。
    while (true) {
      const nowState = getState();
      if (nowState.app.confirm == null) {
        return nowState.app.confirmResult;
      }
      await sleep(10);
    }
  }
);

export const deleteTest = createAppAsyncThunk('deleteTest', async (params: void, { dispatch, getState }) => {
  const result = await dispatch(
    showConfirm({
      title: '削除確認',
      message: '本当に削除しますか？',
      accept: '削除',
      cancel: 'キャンセル',
    })
  ).unwrap();
  if (result) {
    await dispatch(
      showConfirm({
        title: '削除完了',
        message: '削除されました',
        accept: 'OK',
      })
    ).unwrap();
  }
});

export const test = createAppAsyncThunk('test', async (params: void, { dispatch, getState }) => {
  const dp = dispatch(api.endpoints.getUsers.initiate(null, { subscribe: false }));
  const result = await dp.unwrap();
  // dp.unsubscribe();
  // const result = await dp;
  console.log(result);

  // const original = getState().app;
  // const app = Object.assign({}, original);
  // app.index = undefined;
  // const result = diff(original, app);
  // console.log(result);
  // dispatch(appActions.setState(result));
});

// export const moveTo = createAppAsyncThunk('moveTo', async (params: { pathname: string }, { dispatch, getState }) => {
//   // 適当実装
//   if (params.pathname === '/settings') {
//     state.index = undefined;
//     if (state.settings == null) {
//       state.settings = {
//         items: [],
//       };
//     }
//     // urlを切り替え
//     state.router.pathname = payload.pathname;
//   } else {
//     // index
//     state.settings = undefined;
//     if (state.index == null) {
//       state.index = {
//         title: 'インデックス',
//         count: 0,
//       };
//     }
//     // urlを切り替え
//     state.router.pathname = '/';
//   }
//   state.router.counter = (state.router.counter ?? 0) + 1;
// });

// export const updateData = createAppAsyncThunk(
//   'updateData',
//   async (params: { id: string } | undefined, { dispatch, getState }) => {
//     // const result = await sdkClient.update({ params })
//     console.log('dispatch');
//     dispatch(appActions.additional(3));
//     dispatch(appActions.additional(-2));
//     throw new Error('エラー');
//   }
// );

export const getUsers = createAppAsyncThunk('getUsers', async (params: void, { dispatch, getState }) => {
  const result = await dispatch(api.endpoints.getUsers.initiate(null));
  if (result.isSuccess === false) throw result.error ?? new Error();
  return result.data;
});
