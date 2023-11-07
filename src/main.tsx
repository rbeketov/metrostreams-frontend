import React from 'react';
import ReactDOM from 'react-dom';
import ModelingsPage from './components/ModelingsPage.tsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('modelings/');
  }, [navigate]);

  return null;
}

const base_path = process.env.GITHUB_ACTIONS ? 'metrostreams-frontend/' : '/';

const router = createBrowserRouter([
  {
    path: base_path,
    element: <ModelingsPage />,
  },
  {
    path: 'modelings/',
    element: <ModelingsPage />,
  },
  {
    path: 'modelings/:id/',
    element: <ModelingsDetailsPage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
