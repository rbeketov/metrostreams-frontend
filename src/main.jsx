import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ModelingsPage from './components/ModelingsPage.jsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import './index.css';
import store from "./store";

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
  <Provider store={store}>
    <RouterComponent>
      <Routes>
        <Route path={base_path} element={<RedirectComponent />}/>
        <Route path="modelings/" element={<ModelingsPage />}/>
        <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
      </Routes>
    </RouterComponent>
  </Provider>,
  document.getElementById('root')
);
