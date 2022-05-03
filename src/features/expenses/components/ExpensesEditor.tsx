import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'common/layouts/Loading/Loading';
import { Category } from 'features/category/categoryModel';
import {
  categoryActions,
  selectCategories,
  selectCategoryLoading
} from 'features/category/categorySlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import '../Expenses.css';
import { NewExpensesRequest } from '../expensesModel';
import { expensesActions, selectExpensesLoading } from '../expensesSlice';

const ExpensesEditor = () => {
  const categories = useAppSelector(selectCategories);
  const categoryLoading = useAppSelector(selectCategoryLoading);
  const expensesLoading = useAppSelector(selectExpensesLoading);

  const [date, setDate] = useState<Date | null>(new Date());
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [category, setCategory] = useState<Category>(() => categories[0]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validation = yup.object().shape({
    createdAt: yup.string().required('Ngày không được để trống'),
    money: yup
      .string()
      .required('Số tiền không được để trống')
      .matches(/^[0-9,]+$/, 'Số tiền chỉ chứa ký tự số')
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<NewExpensesRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const onSubmit = (request: { note: string; money: string; createdAt: string }) => {
    const expensesRequest: NewExpensesRequest = {
      ...request,
      money: request.money.replace(/,/g, ''),
      category: category && category._id
    };
    dispatch(expensesActions.createExpensesBegin(expensesRequest));
  };

  const handleSelectedCategory = (category: Category, index: number) => {
    setCategoryIndex(index);
    setCategory(category);
  };

  const formatMoney = (value: string) => {
    setValue('money', Number(value.replace(/[^0-9]/g, '')).toLocaleString('en-US'));
  };

  const handleMoneyInputChange = () => {
    const value = getValues('money');
    formatMoney(value);
  };

  useEffect(() => {
    dispatch(categoryActions.getCategoryBegin());
  }, []);

  return (
    <div className="main">
      <form
        style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  error={errors.createdAt ? true : false}
                  id={errors.createdAt && `outlined-error-helper-text`}
                  helperText={errors.createdAt && errors.createdAt?.message}
                  {...register('createdAt')}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Ghi chú"
            variant="outlined"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register('note')}
          />
          <TextField
            label="Số tiền"
            variant="outlined"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            error={errors.money ? true : false}
            id={errors.money && `outlined-error-helper-text`}
            helperText={errors.money && errors.money?.message}
            {...register('money', {
              onChange: () => handleMoneyInputChange()
            })}
          />

          <div className={`categories ${categoryLoading ? 'display-center' : ''}`}>
            <>
              {categoryLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="category-item" onClick={() => navigate('/category/list')}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    <span className="category-name">Chỉnh sửa</span>
                  </div>
                  {categories.map((category, index) => (
                    <Tooltip title={category.name} key={index}>
                      <div
                        className={`category-item ${categoryIndex === index ? 'active' : ''}`}
                        style={{ color: category.color }}
                        onClick={() => handleSelectedCategory(category, index)}
                      >
                        <i className={`fa fa-${category.icon}`} aria-hidden="true"></i>
                        <span className="category-name">{category.name}</span>
                      </div>
                    </Tooltip>
                  ))}
                </>
              )}
            </>
          </div>

          <LoadingButton
            size="medium"
            variant="contained"
            style={{ marginTop: '16px' }}
            type="submit"
            color="primary"
            sx={{ width: '100%' }}
            loading={expensesLoading}
            disabled={expensesLoading ? true : false}
          >
            Nhập khoản chi
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
};

export default ExpensesEditor;
