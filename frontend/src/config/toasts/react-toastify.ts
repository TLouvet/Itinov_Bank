import { toast } from 'react-toastify';

export const sucessToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-right',
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-right',
  });
};

export const warningToast = (message: string) => {
  toast.warning(message, {
    position: 'bottom-right',
  });
};
