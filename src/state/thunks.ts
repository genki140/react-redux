// アクションを実行したり連結したりする。
// logicsへのアクセスも、この階層でのみ行うこととする。

import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../utils/promise';
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

export const updateData = createAppAsyncThunk(
  'updateData',
  async (params: { id: string } | undefined, { dispatch, getState }) => {
    // const result = await sdkClient.update({ params })
    console.log('dispatch');
    dispatch(appActions.additional(3));
    dispatch(appActions.additional(-2));
    throw new Error('エラー');
  }
);
