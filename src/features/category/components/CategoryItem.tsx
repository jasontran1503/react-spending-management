import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../categoryModel';

const CategoryItem = ({
  itemId,
  category,
  loading,
  url,
  money,
  showIconDelete,
  onDeleteItem
}: {
  itemId: string;
  category: Category;
  loading?: boolean;
  url: string;
  money?: number;
  showIconDelete: boolean;
  onDeleteItem?: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  const handleDeleteItem = (id: string) => {
    if (onDeleteItem) {
      onDeleteItem(id);
    }
  };

  return (
    <>
      <ListItem disablePadding onClick={() => navigate(url)}>
        <ListItemButton>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <i
              className={`fa fa-${category ? category.icon : 'ellipsis-h'}`}
              style={{ color: category && category.color }}
              aria-hidden="true"
            ></i>
          </ListItemIcon>
          <ListItemText
            primary={category ? category.name : 'Không có'}
            style={{ color: category && category.color }}
          />
          <div className="display-center">
            {money && (
              <ListItemText
                primary={money.toLocaleString('en-US')}
                style={{ color: category && category.color }}
              />
            )}
            <>
              {showIconDelete && (
                <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                  <>
                    {loading && itemId === selectedItemId ? (
                      <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    ) : (
                      <i
                        className="fa fa-trash"
                        style={{ color: 'red' }}
                        aria-hidden="true"
                        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                          e.stopPropagation();
                          setSelectedItemId(itemId);
                          handleDeleteItem(itemId);
                        }}
                      ></i>
                    )}
                  </>
                </ListItemIcon>
              )}
            </>
          </div>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CategoryItem;
