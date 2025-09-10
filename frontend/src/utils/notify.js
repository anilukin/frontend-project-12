import { toast } from 'react-toastify';

export const notify = (message, type = 'success') => {
  toast(message, {
    type,
    theme: 'light',
  });
};
