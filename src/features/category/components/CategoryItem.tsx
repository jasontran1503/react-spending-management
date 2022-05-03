import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch } from 'app/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../categoryModel';
import { categoryActions } from '../categorySlice';

const CategoryItem = ({
  category,
  loading,
  url,
  money
}: {
  category: Category;
  loading: boolean;
  url: string;
  money?: number;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categoryId, setCategoryId] = useState<string>('');

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryId(categoryId);
    dispatch(categoryActions.deleteCategoryBegin(categoryId));
  };

  return (
    <>
      <ListItem disablePadding onClick={() => navigate(url)}>
        <ListItemButton>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <i
              className={`fa fa-${category.icon}`}
              style={{ color: category.color }}
              aria-hidden="true"
            ></i>
          </ListItemIcon>
          <ListItemText primary={category.name} style={{ color: category.color }} />
          <div className="display-center">
            {money && (
              <ListItemText
                primary={money.toLocaleString('en-US')}
                style={{ color: category.color }}
              />
            )}
            <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
              <>
                {loading && categoryId === category._id ? (
                  <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                ) : (
                  <i
                    className="fa fa-trash"
                    style={{ color: 'red' }}
                    aria-hidden="true"
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      e.stopPropagation();
                      handleDeleteCategory(category._id);
                    }}
                  ></i>
                )}
              </>
            </ListItemIcon>
          </div>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CategoryItem;
