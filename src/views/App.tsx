import { ScopedCssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { store as reduxStore } from '../state/store';
import { AppRouter } from './AppRouter';
import PageSwitcher from './PageSwitcher';

const App = () => (
  <ScopedCssBaseline>
    <ReduxProvider store={reduxStore}>
      <AppRouter>
        <PageSwitcher />
      </AppRouter>
    </ReduxProvider>
  </ScopedCssBaseline>
);

export default App;
