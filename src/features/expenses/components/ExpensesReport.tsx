import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import expensesApi from 'apis/expensesApi';
import { useAppDispatch } from 'app/hooks';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../Expenses.css';
import { ExpensesItem } from '../expensesModel';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const ExpensesReport = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const dispatch = useAppDispatch();
  const [monthlyExpenses, setMonthlyExpenses] = useState<ExpensesItem[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  useEffect(() => {
    const dateFormat = date?.toISOString().substring(0, 7);
    // dispatch(expensesActions.reportMonthlyExpensesBegin(dateFormat));
    const reportMonthlyExpenses = async () => {
      if (dateFormat) {
        const response = await expensesApi.reportMonthly(dateFormat);
        setMonthlyExpenses(response.monthlyExpensesList);
        setTotalMoney(response.totalMoney);
      }
    };

    reportMonthlyExpenses();
  }, [date]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'calc(100% - 75px)',
        marginTop: '20px',
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
          views={['year', 'month']}
          inputFormat="MM/yyyy"
          onChange={(newValue: Date | null) => {
            setDate(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" InputLabelProps={{ shrink: true }} />
          )}
        />
      </LocalizationProvider>
      <div className="total-money" style={{ width: '100%', marginTop: '10px' }}>
        <strong>Tổng chi:</strong>
        <strong>{totalMoney.toLocaleString('en-US')}đ</strong>
        {/* {loading ? (
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        ) : (
          <strong>{expensesDailyMoney.toLocaleString('en-US')}đ</strong>
        )} */}
      </div>

      <Doughnut data={data} className="chart" />

      <div style={{ width: '100%', height: '150px', overflowY: 'auto', marginTop: '10px' }}>
        {monthlyExpenses.map((item) => (
          <div key={item._id}>
            <CategoryItem
              itemId={item._id}
              category={item.category}
              money={item.money}
              loading={false}
              showIconDelete={false}
              url={`/expenses/editor/${item._id}`}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ExpensesReport;
