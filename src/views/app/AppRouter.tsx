import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { useActions, useSelector } from '../hooks/useRedux';

import type { BrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import usePrevious from '../hooks/usePrevious';

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

  useLayoutEffect(() => {
    const unlisten = history.listen(setState);
    return () => unlisten();
  }, [history]);

  const storePathname = useSelector((x) => x.router.pathname);
  const browserPathname = history.location.pathname;
  // 前回render時のpathname
  const prevStorePathname = usePrevious<string | undefined>(storePathname, undefined);
  const prevBrowserPathname = usePrevious<string | undefined>(browserPathname, undefined);

  const actions = useActions();

  // 初回はブラウザのURLを優先する。それ以降はストアのURLを優先する。
  useLayoutEffect(() => {
    if (browserPathname !== storePathname) {
      if (browserPathname !== prevBrowserPathname || (storePathname === '' && prevStorePathname !== '')) {
        actions.moveTo({ pathname: browserPathname });
      } else if (storePathname !== prevStorePathname) {
        history.push(storePathname);
      }
    }
    //    }
  }, [history, actions, browserPathname, storePathname, prevBrowserPathname, prevStorePathname]);

  return (
    <Router children={props.children} location={state.location} navigationType={state.action} navigator={history} />
  );
}
