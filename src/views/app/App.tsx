import './app.css';
import { ScopedCssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../state/store';
import { AppRouter } from './AppRouter';
import PageSwitcher from './PageSwitcher';
import ThemeProvider from './ThemeProvider';

const App = () => (
  <ScopedCssBaseline>
    <ReduxProvider store={store}>
      <AppRouter>
        <ThemeProvider>
          <PageSwitcher />
        </ThemeProvider>
      </AppRouter>
    </ReduxProvider>
  </ScopedCssBaseline>
);

export default App;
