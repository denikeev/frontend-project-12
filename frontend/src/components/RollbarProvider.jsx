import { Provider } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    {children}
  </Provider>
);

export default RollbarProvider;
