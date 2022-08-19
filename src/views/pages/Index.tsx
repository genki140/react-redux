import { Box, Button } from '@mui/material';
import { useActions, useSelector } from '../hooks/useRedux';

const Index = () => {
  const actions = useActions();
  const store = useSelector((x) => x.index)!;

  return (
    <>
      <Box>これはインデックスページです</Box>
      <Button onClick={() => actions.moveTo({ pathname: '/settings' })}>設定画面に移動</Button>
      <Button onClick={() => actions.additional(1)}>Add</Button>
      <Box>{store.count}</Box>

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
        variant="contained"
        color="warning"
      >
        削除
      </Button>

      {/* <Button onClick={() => actions.updateData()}>Update</Button> */}
    </>
  );
};
export default Index;
