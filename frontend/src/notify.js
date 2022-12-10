import { toast } from 'react-toastify';

const defaultProps = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

const map = {
  success: toast.success,
  warn: toast.warn,
  err: toast.error,
};

export default (type, text, customProp = {}) => {
  const currentToast = map[type];
  const props = { ...defaultProps, ...customProp };
  return currentToast(text, props);
};
