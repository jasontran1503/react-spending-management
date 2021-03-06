import React from 'react';
import { useRoutes } from 'react-router-dom';
import CategoryEditor from './components/CategoryEditor';
import CategoryList from './components/CategoryList';

const Category = () => {
  const routes = useRoutes([
    {
      path: '',
      children: [
        {
          path: 'editor',
          children: [
            {
              path: '',
              element: <CategoryEditor />
            },
            {
              path: ':categoryId',
              element: <CategoryEditor />
            }
          ]
        },
        {
          path: 'list',
          element: <CategoryList />
        }
      ]
    }
  ]);

  return <>{routes}</>;
};

export default Category;
