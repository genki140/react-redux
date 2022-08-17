import { Box, Button } from '@mui/material';
import { useActions } from '../hooks/useRedux';

const Settings = () => {
  const actions = useActions();
  // const store = useSelector((x) => x.Index);

  return (
    <>
      <Box>これは設定ページです</Box>
      <Button onClick={() => actions.moveTo({ pathname: '' })}>
        インデックスに移動
      </Button>
    </>
  );
};
export default Settings;
