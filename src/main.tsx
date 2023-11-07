import React from 'react';
import ReactDOM from 'react-dom';
import ModelingsPage from './components/ModelingsPage.tsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import { useNavigate } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {BrowserRouter} from "react-router-dom";
import {HashRouter, Route, Routes} from "react-router-dom";
import './index.css';


const base_path = process.env.GITHUB_ACTIONS ? 'metrostreams-frontend/' : '/';
// const FlexibleRouter = process.env.GITHUB_ACTIONS ? HashRouter : BrowserRouter
// const prefix = process.env.GITHUB_ACTIONS ? '#/' : ''


function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("modelings/");
  }, [navigate]);
  return null;
}


ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path={base_path} element={<RedirectComponent />}/>
      <Route path="modelings/" element={<ModelingsPage />}/>
      <Route path="modelings/" element={<ModelingsDetailsPage />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);