import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useActions, useSelector } from '../hooks/useRedux';

const Index = () => {
  const actions = useActions();
  const store = useSelector((x) => x.index)!;
  const routerCounter = useSelector((x) => x.router.counter) ?? 0;

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h2">トップページ</Typography>

        <Typography variant="h3">ナビゲーション</Typography>

        <Box>
          <Box>ブラウザの機能で移動しても、ステート変更で移動出来る。</Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button onClick={() => actions.moveTo({ pathname: '/settings' })}>設定画面に移動</Button>
            <Box>画面移動回数：{routerCounter}</Box>
          </Stack>
        </Box>

        <Typography variant="h3">カウンターテスト</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button onClick={() => actions.additional(1)}>Add</Button>
          <Box>{store.count}</Box>
        </Stack>

        <Typography variant="h3">ダイアログテスト</Typography>
        <Box>
          <Button
            onClick={async () => {
              const result = await actions.showConfirm({
                title: '削除確認',
                message: '本当に削除しますか？',
                accept: '削除',
                cancel: 'キャンセル',
              });
              if (result) {
                await actions.showConfirm({
                  title: '削除完了',
                  message: '削除されました',
                  accept: 'OK',
                });
              }
            }}
            color="warning"
          >
            削除
          </Button>
        </Box>

        <Typography variant="h3">テスト</Typography>
        <Button
          onClick={() => {
            actions.test();
          }}
        >
          Test
        </Button>
      </Stack>
    </>
  );
};
export default Index;
