import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryActions, selectCategories, selectCategoryLoading } from '../categorySlice';

const CategoryList = () => {
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoryLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string>('');

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryId(categoryId);
    dispatch(categoryActions.deleteCategoryBegin(categoryId));
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        height: 'calc(80vh - 55px)',
        overflowY: 'auto',
        marginTop: '0 !important'
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </ListItemIcon>
              <ListItemText primary="Thêm danh mục" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {categories.map((category) => (
            <div key={category._id}>
              <ListItem disablePadding onClick={() => navigate('/category/editor')}>
                <ListItemButton>
                  <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                      className={`fa fa-${category.icon}`}
                      style={{ color: category.color }}
                      aria-hidden="true"
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary={category.name} style={{ color: category.color }} />
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
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default CategoryList;
