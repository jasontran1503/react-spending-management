import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ExpensesCalendar from './components/ExpensesCalendar';
import ExpensesEditor from './components/ExpensesEditor';
import ExpensesReport from './components/ExpensesReport';
import ExpensesReportDetail from './components/ExpensesReportDetail';

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
        { path: 'calendar/:date', element: <ExpensesCalendar /> },
        {
          path: 'report',
          children: [
            {
              path: '',
              element: <ExpensesReport />
            },
            {
              path: ':date/:categoryId',
              element: <ExpensesReportDetail />
            }
          ]
        }
      ]
    }
  ]);

  return <>{routes}</>;
};

export default Expenses;
