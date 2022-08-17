// storeの型定義
export type AppState = {
  router: {
    pathname: string;
  };

  index?: { title: string; count1: number; count2: number };

  settings?: {
    items: { name: string }[];
  };

  confirm?: {
    message: string;
  };
};

// 初期値の定義
export const appInitialState: AppState = {
  router: {
    pathname: '/',
  },
};
