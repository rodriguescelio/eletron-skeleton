import { FC } from 'react';
import { Provider } from 'react-redux';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import store from './store';

const router = createHashRouter([]);

const App: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
