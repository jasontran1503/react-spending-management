import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'common/layouts/Loading/Loading';
import formatDate from 'common/logic/formatDate';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Expenses.css';
import {
  expensesActions,
  selectDailyExpensesList,
  selectDailyExpensesMoney,
  selectExpensesLoading
} from '../expensesSlice';

const ExpensesCalendar = () => {
  const { date } = useParams();
  const [dateValue, setDateValue] = useState<Date | null>(date ? new Date(date) : new Date());
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectExpensesLoading);
  const expensesDailyList = useAppSelector(selectDailyExpensesList);
  const expensesDailyMoney = useAppSelector(selectDailyExpensesMoney);

  const reportExpensesDaily = async () => {
    let result = '';
    if (dateValue) {
      result = formatDate(dateValue);
    }
    dispatch(expensesActions.reportDailyExpensesBegin(result));
  };

  const handleDeleteExpenses = (expensesId: string) => {
    dispatch(expensesActions.deleteExpensesBegin(expensesId));
  };

  useEffect(() => {
    reportExpensesDaily();
  }, [dateValue]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{ width: 'auto', height: '55%' }}>
          <StaticDatePicker<Date>
            showToolbar={false}
            openTo="day"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>

      <div className="total-money">
        <strong>Tổng chi:</strong>
        {loading ? (
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        ) : (
          <strong>{expensesDailyMoney.toLocaleString('en-US')}đ</strong>
        )}
      </div>

      <div
        style={{ width: 'auto', height: 'calc(45% - 115px)', overflowY: 'auto' }}
        className="display-center"
      >
        <>
          {loading ? (
            <Loading />
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              {expensesDailyList.map((item) => (
                <div key={item._id}>
                  <CategoryItem
                    itemId={item._id}
                    category={item.category}
                    money={item.money}
                    loading={loading}
                    showIconDelete={true}
                    url={`/expenses/editor/${item._id}`}
                    onDeleteItem={handleDeleteExpenses}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ExpensesCalendar;
