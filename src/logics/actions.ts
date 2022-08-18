// アクションの定義

import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AppState } from './state';
import { appActions, RootDispatch, RootState } from './store';

const moveTo = (
  state: AppState,
  { payload }: PayloadAction<{ pathname: string }>
) => {
  // urlに応じて必要な画面インスタンスを生成したり破棄したりする。

  // 適当実装
  if (payload.pathname === '/settings') {
    state.index = undefined;
    if (state.settings == null) {
      state.settings = {
        items: [],
      };
    }
    // urlを切り替え
    state.router.pathname = payload.pathname;
  } else {
    // index
    state.settings = undefined;
    if (state.index == null) {
      state.index = {
        title: 'インデックス',
        count: 0,
      };
    }
    // urlを切り替え
    state.router.pathname = '/';
  }
};

const additional = (state: AppState, { payload }: PayloadAction<number>) => {
  if (state.index != null) {
    state.index.count += payload;
  }
};

export const actions = {
  moveTo,
  additional,
};

// 非同期アクションの定義テスト
export function createAppAsyncThunk<Returned, ThunkArg>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    { dispatch: RootDispatch; state: RootState }
  >,
  options?: AsyncThunkOptions<ThunkArg>
): AsyncThunk<
  Returned,
  ThunkArg,
  { dispatch: RootDispatch; state: RootState }
> {
  return createAsyncThunk<
    Returned,
    ThunkArg,
    { dispatch: RootDispatch; state: RootState }
  >('app/' + typePrefix, payloadCreator);
}

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
