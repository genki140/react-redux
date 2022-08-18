import { ScopedCssBaseline } from '@mui/material';
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store as reduxStore } from '../logics/store';
import { useActions, useSelector } from './hooks/useRedux';
import Index from './pages/Index';
import Settings from './pages/Settings';

import type { BrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

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

function usePrevious<T>(value: T, initial: T) {
  const ref = useRef<T>(initial);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function AppRouter(props: { children: ReactNode }) {
  // ステートのpathnameとブラウザのpathnameを同期させる。
  let historyRef = useRef<BrowserHistory>();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window });
  }

  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  const storePathname = useSelector((x) => x.router.pathname);
  const browserPathname = history.location.pathname;
  // 前回render時のpathname
  const prevStorePathname = usePrevious<string | undefined>(storePathname, undefined);
  const prevBrowserPathname = usePrevious<string | undefined>(browserPathname, undefined);

  const isFirstTime = useRef(true);
  const actions = useActions();

  // 初回はブラウザのURLを優先する。それ以降はストアのURLを優先する。
  useLayoutEffect(() => {
    if (isFirstTime.current) {
      actions.moveTo({ pathname: browserPathname });
      isFirstTime.current = false;
    } else {
      if (browserPathname !== storePathname) {
        if (browserPathname !== prevBrowserPathname) {
          actions.moveTo({ pathname: browserPathname });
        } else if (storePathname !== prevStorePathname) {
          history.push(storePathname);
        }
      }
    }
  }, [history, actions, browserPathname, storePathname, prevBrowserPathname, prevStorePathname]);

  return (
    <Router children={props.children} location={state.location} navigationType={state.action} navigator={history} />
  );
}

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
