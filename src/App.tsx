import './App.css';
import { useActions, useSelector } from './modules/store';
import { Box, Button } from '@mui/material';

const App = () => {
  console.log('Render App');
  return (
    <>
      <Counter1 />
      <Counter2 />
    </>
  );
};
export default App;

const Counter1 = () => {
  console.log('Render Counter1');
  const actions = useActions();
  const count = useSelector((x) => x.app1.count1);
  return (
    <>
      <Button onClick={() => actions.app1.additional1(1)}>Add</Button>
      <Box>{count}</Box>
    </>
  );
};
const Counter2 = () => {
  console.log('Render Counter2');
  const actions = useActions();
  const count = useSelector((x) => x.app2.count1);
  return (
    <>
      <Button onClick={() => actions.app2.additional1(1)}>Add</Button>
      <Box>{count}</Box>
    </>
  );
};
