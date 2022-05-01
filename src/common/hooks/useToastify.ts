import { toast } from 'react-toastify';

type ToastifyType = 'success' | 'info' | 'warn' | 'error';

export const useToastify = (type: ToastifyType, message: string) => {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
