import { Box, Button, Stack, Typography } from '@mui/material';
import { useActions, useSelector } from '../hooks/useRedux';

const Settings = () => {
  const actions = useActions();
  const routerCounter = useSelector((x) => x.router.counter) ?? 0;

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h2">設定ページ</Typography>

        <Typography variant="h3">ナビゲーション</Typography>

        <Box>
          <Box>ブラウザの機能で移動しても、ステート変更で移動出来る。</Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button onClick={() => actions.moveTo({ pathname: '/' })}>トップページに移動</Button>
            <Box>画面移動回数：{routerCounter}</Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
export default Settings;
