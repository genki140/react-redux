import { ScopedCssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../state/store';
import { AppRouter } from './AppRouter';
import PageSwitcher from './PageSwitcher';

const App = () => (
  <ScopedCssBaseline>
    <ReduxProvider store={store}>
      <AppRouter>
        <PageSwitcher />
      </AppRouter>
    </ReduxProvider>
  </ScopedCssBaseline>
);

export default App;
