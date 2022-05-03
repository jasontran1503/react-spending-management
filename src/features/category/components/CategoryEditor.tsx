import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Loading from 'common/layouts/Loading/Loading';
import '../Category.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  categoryActions,
  selectCategoryLoading,
  selectColors,
  selectIcons,
  selectSingleCategory
} from '../categorySlice';
import { Controller, useForm } from 'react-hook-form';
import { CategoryRequest } from '../categoryModel';
import { useParams } from 'react-router-dom';

const CategoryEditor = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCategoryLoading);
  const colors = useAppSelector(selectColors);
  const icons = useAppSelector(selectIcons);

  const { categoryId } = useParams();
  const singleCategory = useAppSelector(selectSingleCategory(categoryId ? categoryId : ''));

  const [iconIndex, setIconIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(categoryActions.getColorsBegin());
    dispatch(categoryActions.getIconsBegin());
  }, []);

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onTouched' });
  const onSubmit = () => {
    const name = getValues('name');
    const request: CategoryRequest = {
      name,
      color: colors[colorIndex]?.name,
      icon: icons[iconIndex]?.name
    };

    if (categoryId) {
      const updateRequest = { request, categoryId };
      dispatch(categoryActions.updateCategoryBegin(updateRequest));
      return;
    }
    dispatch(categoryActions.createCategoryBegin(request));
  };

  useEffect(() => {
    const setCategoryData = () => {
      if (singleCategory) {
        setValue('name', singleCategory.name);
        const colorIndex = colors.findIndex((color) => color.name === singleCategory.color);
        setColorIndex(colorIndex);
        const iconIndex = icons.findIndex((icon) => icon.name === singleCategory.icon);
        setIconIndex(iconIndex);
      }
    };

    setCategoryData();
  }, [loading, singleCategory, colors, icons, setValue, setColorIndex, setIconIndex]);

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        '& .MuiTextField-root': {
          width: {
            xs: '30ch',
            sm: '35ch',
            md: '40ch',
            lg: '45ch',
            xl: '50ch'
          }
        }
      }}
    >
      <Controller
        render={({ field }) => (
          <TextField
            label="Ghi chú"
            variant="outlined"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...field}
            id={errors.name && `outlined-error-helper-text`}
            helperText={errors.name && errors.name?.message}
            error={errors.name ? true : false}
          />
        )}
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: 'Tên không được để trống' }}
      />

      <div className="category-box-select">
        <fieldset className={`box-fieldset ${loading ? 'display-center' : ''}`}>
          <legend className="box-title">Biểu tượng</legend>
          <>
            {loading ? (
              <Loading />
            ) : (
              <div className="box-select">
                {icons.map((icon, index) => (
                  <div
                    className={`category-item ${iconIndex === index ? 'active' : ''}`}
                    key={icon._id}
                    onClick={() => setIconIndex(index)}
                  >
                    <i
                      className={`fa fa-${icon.name}`}
                      aria-hidden="true"
                      style={{ color: `${iconIndex === index ? colors[colorIndex]?.name : ''}` }}
                    ></i>
                  </div>
                ))}
              </div>
            )}
          </>
        </fieldset>

        <fieldset className={`box-fieldset ${loading ? 'display-center' : ''}`}>
          <legend className="box-title">Màu sắc</legend>
          <>
            {loading ? (
              <Loading />
            ) : (
              <div className="box-select">
                {colors.map((color, index) => (
                  <div
                    className={`category-item ${colorIndex === index ? 'active' : ''}`}
                    key={color._id}
                    style={{ backgroundColor: color.name }}
                    onClick={() => setColorIndex(index)}
                  ></div>
                ))}
              </div>
            )}
          </>
        </fieldset>
      </div>

      <LoadingButton
        size="medium"
        variant="contained"
        style={{ marginTop: '16px' }}
        type="submit"
        color="primary"
        sx={{ width: '90%' }}
        loading={loading}
        disabled={loading ? true : false}
      >
        Lưu
      </LoadingButton>
    </Box>
  );
};

export default CategoryEditor;
