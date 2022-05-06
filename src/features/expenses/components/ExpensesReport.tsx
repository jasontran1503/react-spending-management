import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import expensesApi from 'apis/expensesApi';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../Expenses.css';
import { ExpensesItem } from '../expensesModel';

interface ChartData {
  labels?: string[];
  datasets: ChartDatasets[];
}

interface ChartDatasets {
  labels?: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesReport = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [monthlyExpenses, setMonthlyExpenses] = useState<ExpensesItem[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    datasets: [{ labels: [], data: [], backgroundColor: [], borderColor: [], borderWidth: 1 }]
  });

  useEffect(() => {
    let dateFormat = '';
    if (date) {
      dateFormat = date.toISOString().substring(0, 7);
    }
    const reportMonthlyExpenses = async () => {
      try {
        const response = await expensesApi.reportMonthly(dateFormat);
        setMonthlyExpenses(response.monthlyExpensesList);
        setTotalMoney(response.totalMoney);

        let money: number[] = [];
        let color: string[] = [];
        let labels: string[] = [];
        response.monthlyExpensesList.forEach((item) => {
          money = [...money, item.money];
          color = [...color, item.category ? item.category.color : 'black'];
          labels = [...labels, item.category ? item.category.name : 'Không có'];
        });
        setLabels(labels);
        setChartData({
          datasets: [
            { labels, data: money, backgroundColor: color, borderColor: color, borderWidth: 1 }
          ]
        });
      } catch (error) {}
    };

    reportMonthlyExpenses();
  }, [date]);

  return (
    <>
      {date && (
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
          </div>

          <Doughnut
            data={chartData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${labels[context.dataIndex]}: ${context.dataset.data[
                        context.dataIndex
                      ].toLocaleString('en-US')}đ`
                  }
                }
              }
            }}
            className="chart"
          />

          <div style={{ width: '100%', height: '150px', overflowY: 'auto', marginTop: '10px' }}>
            {monthlyExpenses.map((item) => (
              <div key={item._id}>
                <CategoryItem
                  itemId={item._id}
                  category={item.category}
                  money={item.money}
                  loading={false}
                  showIconDelete={false}
                  url={`/expenses/report/${date.toISOString().substring(0, 7)}/${
                    item.category ? item.category._id : null
                  }`}
                />
              </div>
            ))}
          </div>
        </Box>
      )}
    </>
  );
};

export default ExpensesReport;
