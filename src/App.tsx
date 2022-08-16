import './App.css';
import { useActions, useSelector } from './modules/store';
import { Box, Button } from '@mui/material';

function App() {
  const actions = useActions();
  const count = useSelector((x) => x.app.count);

  return (
    <>
      <Button onClick={() => actions.additional(2)}>Add</Button>
      <Button onClick={() => actions.subtraction(1)}>Sub</Button>
      <Box>{count}</Box>
    </>
  );
}

export default App;
