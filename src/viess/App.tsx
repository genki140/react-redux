import { ScopedCssBaseline } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { store as reduxStore } from '../logics/store';
import { useActions, useSelector } from './hooks/useRedux';
import Index from './pages/Index';
import Settings from './pages/Settings';

const App = () => (
  <ScopedCssBaseline>
    <ReduxProvider store={reduxStore}>
      <BrowserRouter>
        <AppRouter>
          <PageSwitcher />
        </AppRouter>
      </BrowserRouter>
    </ReduxProvider>
  </ScopedCssBaseline>
);
export default App;

const AppRouter = (props: { children: ReactNode }) => {
  const storePathname = useSelector((x) => x.router.pathname);
  const browserPathname = useLocation().pathname;
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const actions = useActions();

  // 初回はブラウザのURLを優先する。それ以降はストアのURLを優先する。
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      actions.moveTo({ pathname: browserPathname });
    } else {
      if (browserPathname !== storePathname) {
        navigate(storePathname);
      }
    }
  }, [navigate, browserPathname, storePathname, isFirstTime, actions]);

  return <>{props.children}</>;
};

const PageSwitcher = () => {
  const index = useSelector((x) => x.index != null);
  const settings = useSelector((x) => x.settings != null);
  return (
    <>
      {index && <Index />}
      {settings && <Settings />}
    </>
  );
};
