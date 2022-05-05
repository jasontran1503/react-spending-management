import { format } from 'date-fns';

const formatDate = (dateValue: Date) => {
  return format(dateValue, 'MM-dd-yyyy');
};

export default formatDate;
