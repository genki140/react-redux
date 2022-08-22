// storeの型定義
export type AppState = {
  router: {
    pathname: string;
    counter?: number; // テスト
  };

  index?: { title: string; count: number };

  settings?: {
    items: { name: string }[];
  };

  confirm?: {
    title: string;
    message: string;
    accept: string;
    cancel?: string;
  };
  confirmResult?: boolean;

  test?: string;
};

// 初期値の定義
export const appInitialState: AppState = {
  router: {
    pathname: '',
  },
  // confirm: {
  //   title: 'タイトルだよ',
  //   message: 'メッセージだよ',
  //   ok: 'OK',
  //   result: false,
  // },
  test: 'テストです',
};
