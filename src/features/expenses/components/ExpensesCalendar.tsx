import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import expensesApi from 'apis/expensesApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'common/layouts/Loading/Loading';
import { format } from 'date-fns';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect, useState } from 'react';
import '../Expenses.css';
import { ExpensesItem } from '../expensesModel';
import { expensesActions, selectExpensesLoading } from '../expensesSlice';

const ExpensesCalendar = () => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectExpensesLoading);
  const [expensesDailyList, setExpensesDailyList] = useState<ExpensesItem[]>([]);
  const [expensesDailyMoney, setExpensesDailyMoney] = useState<number>(0);

  const reportExpensesDaily = async () => {
    let result = '';
    if (dateValue) {
      result = format(dateValue, 'MM-dd-yyyy');
    }
    const { dailyExpensesList, totalMoney } = await expensesApi.reportDaily(result);
    setExpensesDailyList(dailyExpensesList);
    setExpensesDailyMoney(totalMoney);
  };

  const handleDeleteExpenses = (expensesId: string) => {
    dispatch(expensesActions.deleteExpensesBegin(expensesId));
    const newExpensesDailyList = expensesDailyList.filter((item) => {
      if (item._id === expensesId) {
        setExpensesDailyMoney(expensesDailyMoney - item.money);
      }
      return item._id !== expensesId;
    });
    setExpensesDailyList(newExpensesDailyList);
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
        <strong>{expensesDailyMoney.toLocaleString('en-US')}đ</strong>
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
