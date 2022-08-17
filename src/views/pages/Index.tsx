import { Box, Button } from '@mui/material';
import { useActions, useSelector } from '../hooks/useRedux';

const Index = () => {
  const actions = useActions();
  const store = useSelector((x) => x.index)!;

  return (
    <>
      <Box>これはインデックスページです</Box>
      <Button onClick={() => actions.moveTo({ pathname: '/settings' })}>
        設定画面に移動
      </Button>
      <Button onClick={() => actions.additional1(1)}>Add</Button>
      <Box>{store.count1}</Box>
    </>
  );
};
export default Index;
