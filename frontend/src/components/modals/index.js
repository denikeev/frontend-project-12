import Add from './Add.jsx';

const modals = {
  adding: Add,
};

export default (modalName) => modals[modalName];
