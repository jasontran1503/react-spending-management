import { Box, List } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import formatDate from 'common/logic/formatDate';
import CategoryItem from 'features/category/components/CategoryItem';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  expensesActions,
  selectExpensesInMonthByCategory,
  selectExpensesLoading
} from '../expensesSlice';

const ExpensesReportDetail = () => {
  const loading = useAppSelector(selectExpensesLoading);
  const expenses = useAppSelector(selectExpensesInMonthByCategory);
  const dispatch = useAppDispatch();
  const { date, categoryId } = useParams();

  useEffect(() => {
    dispatch(expensesActions.getExpensesInMonthByCategoryBegin({ date, categoryId }));
  }, []);

  const handleDeleteExpenses = (expensesId: string) => {
    dispatch(expensesActions.deleteExpensesBegin(expensesId));
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
          {expenses.map((item) => (
            <div key={item._id}>
              <small style={{ fontWeight: '600' }}>{formatDate(new Date(item.createdAt))}</small>
              <CategoryItem
                itemId={item._id}
                category={item.category}
                loading={loading}
                url={`/expenses/editor/${item._id}`}
                showIconDelete={true}
                money={item.money}
                onDeleteItem={handleDeleteExpenses}
              />
            </div>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default ExpensesReportDetail;
