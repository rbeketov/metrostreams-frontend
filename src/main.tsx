import React from 'react';
import ReactDOM from 'react-dom/client';
import ModelingsPage from './ModelingsPage.tsx';
import ModelingsDetailsPage from './ModelingsDetailsPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/modelings/',
    element: <ModelingsPage />,
  },
  {
    path: '/modelings/:id/',
    element: <ModelingsDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)