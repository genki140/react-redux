// storeの型定義
export type AppState = {
  router: {
    // initialized?: boolean;
    pathname: string;
  };

  index?: { title: string; count: number };

  settings?: {
    items: { name: string }[];
  };

  confirm?: {
    title: string;
    message: string;
    ok: string;
    cancel?: string;
    result: boolean;
  };
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
};
