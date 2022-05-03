import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'common/layouts/Loading/Loading';
import { format } from 'date-fns';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect, useState } from 'react';
import '../Expenses.css';
import {
  expensesActions,
  selectExpensesDailyList,
  selectExpensesDailyMoney,
  selectExpensesLoading
} from '../expensesSlice';

const ExpensesCalendar = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectExpensesLoading);
  const expensesDailyList = useAppSelector(selectExpensesDailyList);
  const expensesDailyMoney = useAppSelector(selectExpensesDailyMoney);

  useEffect(() => {
    if (dateValue) {
      const result = format(dateValue, 'MM-dd-yyyy');
      dispatch(expensesActions.reportDailyBegin(result));
    }
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
        <strong>{expensesDailyMoney.toLocaleString('en-US')}</strong>
      </div>

      <div
        style={{ width: 'auto', height: 'calc(45% - 85px)', overflowY: 'auto' }}
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
                    category={item.category}
                    money={item.money}
                    loading={loading}
                    url={`/expenses/editor/${item._id}`}
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
