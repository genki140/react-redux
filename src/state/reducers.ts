// Reducers の定義。ここではstoreに依存しない、純粋な関数を定義。

import { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './state';

const moveTo = (state: AppState, { payload }: PayloadAction<{ pathname: string }>) => {
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

const openConfirm = (
  state: AppState,
  {
    payload,
  }: PayloadAction<{
    title: string;
    message: string;
    accept: string;
    cancel?: string;
  }>
) => {
  state.confirm = payload;
};

const closeConfirm = (state: AppState, { payload }: PayloadAction<boolean>) => {
  state.confirm = undefined;
  state.confirmResult = payload;
};

// 全 Reducers をまとめて返す
const reducers = {
  moveTo,
  additional,
  openConfirm,
  closeConfirm,
};
export default reducers;
