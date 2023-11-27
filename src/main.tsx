import React from 'react';
import ReactDOM from 'react-dom';
import ModelingsPage from './components/ModelingsPage.tsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import './index.css';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const base_path = isLocal ? '/' : 'metrostreams-frontend/';


function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("modelings/");
  }, [navigate]);
  return null;
}

const RouterComponent = isLocal ? BrowserRouter : HashRouter;

ReactDOM.render(
  <RouterComponent>
    <Routes>
      <Route path={base_path} element={<RedirectComponent />}/>
      <Route path="modelings/" element={<ModelingsPage />}/>
      <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
    </Routes>
  </RouterComponent>,
  document.getElementById('root')
);
