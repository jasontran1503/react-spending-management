import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ExpensesCalendar from './components/ExpensesCalendar';
import ExpensesEditor from './components/ExpensesEditor';
import ExpensesReport from './components/ExpensesReport';

const Expenses = () => {
  const routes = useRoutes([
    { path: '', element: <Navigate to="editor" /> },
    {
      path: '',
      children: [
        {
          path: 'editor',
          children: [
            {
              path: '',
              element: <ExpensesEditor />
            },
            {
              path: ':expensesId',
              element: <ExpensesEditor />
            }
          ]
        },
        { path: 'calendar', element: <ExpensesCalendar /> },
        { path: 'report', element: <ExpensesReport /> }
      ]
    }
  ]);

  return <>{routes}</>;
};

export default Expenses;