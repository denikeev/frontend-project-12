import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootRoute from './RootRoute';
import Login from './Login';
import NoMatch from './NoMatch';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootRoute />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </>,
  ),
);

export default Router;
