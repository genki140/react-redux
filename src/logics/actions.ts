// アクションの定義

import { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './state';

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
        count1: 0,
        count2: 0,
      };
    }
    // urlを切り替え
    state.router.pathname = '/';
  }
};

const additional1 = (state: AppState, { payload }: PayloadAction<number>) => {
  if (state.index != null) {
    state.index.count1 += payload;
  }
};
const additional2 = (state: AppState, { payload }: PayloadAction<number>) => {
  if (state.index != null) {
    state.index.count2 += payload;
  }
};

export const actions = {
  moveTo,
  additional1,
  additional2,
};
