import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryActions, selectCategories, selectCategoryLoading } from '../categorySlice';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoryLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(categoryActions.deleteCategoryBegin(categoryId));
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        height: 'calc(100% - 55px)',
        overflowY: 'auto',
        marginTop: '0 !important'
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding onClick={() => navigate('/category/editor')}>
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
              <CategoryItem
                itemId={category._id}
                category={category}
                loading={loading}
                url={`/category/editor/${category._id}`}
                showIconDelete={true}
                onDeleteItem={handleDeleteCategory}
              />
            </div>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default CategoryList;
