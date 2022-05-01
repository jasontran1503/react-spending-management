import React from 'react';
import type { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

const HistoryRouter = ({ basename, children, history }: HistoryRouterProps) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default HistoryRouter;
