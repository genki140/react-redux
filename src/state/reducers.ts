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
  state.router.counter = (state.router.counter ?? 0) + 1;
};

const additional = (state: AppState, { payload }: PayloadAction<number>) => {
  if (state.index != null) {
    state.index.count += payload;
  }
};

// 再帰的にオプショナルにする。
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// オブジェクトの深いマージを行う。
function mergeDeeply(target: any, source: any, opts?: { concatArray: boolean }) {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);
  const isConcatArray = opts && opts.concatArray;
  let result = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    for (const [sourceKey, sourceValue] of Object.entries(source)) {
      const targetValue = target[sourceKey];
      if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        result[sourceKey] = targetValue.concat(...sourceValue);
      } else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
        result[sourceKey] = mergeDeeply(targetValue, sourceValue, opts);
      } else {
        Object.assign(result, { [sourceKey]: sourceValue });
      }
    }
  }
  return result;
}

// undefinedの指定が全てのフィールドで可能となっている
const setState = (state: AppState, { payload }: PayloadAction<RecursivePartial<AppState>>) => {
  console.log(payload);

  // この実装どうなんだろう。そのうち重くて使えなくなりそう？
  const merged = mergeDeeply(state, payload);
  // console.log(merged);
  for (let key of Object.keys(merged)) {
    // console.log(key);
    (state as any)[key] = merged[key];
    // console.log((state as any)[key]);
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
  setState,
  moveTo,
  additional,
  openConfirm,
  closeConfirm,
};
export default reducers;
