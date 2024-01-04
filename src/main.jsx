import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModelingsPage from './components/ModelingsPage.jsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.jsx';
import MainPage from './components/MainPage.jsx';
import AuthorizationPage from './components/AuthorizationPage.jsx';
import Logout from './components/Logout.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import CartPage from './components/CartPage.jsx';
import ApplicationsPage from './components/ApplicationsPage.jsx'
import ModelingsEditPage from './components/ModelingsEditPage.jsx';
import AppDetail from './components/AppDetail.jsx'
import ConstructorPage from './components/ConstuctorModeling.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import './index.css';
import store from "./store";


const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '0.0.0.0';

const base_path = isLocal ? '/' : 'metrostreams-frontend/#/';
const RouterComponent = isLocal ? BrowserRouter : HashRouter;

ReactDOM.render(
  <Provider store={store}>
    <RouterComponent>
      <Routes>
        <Route path={base_path} element={<MainPage />}/>
        <Route path="modelings/" element={<ModelingsPage />}/>
        <Route path="modelings/edit/" element={<ModelingsEditPage />}/>
        <Route path="modelings/edit/:id/" element={<ConstructorPage />}/>
        <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
        <Route path="login/" element={<AuthorizationPage />}/>
        <Route path="logout/" element={<Logout />}/>
        <Route path="registration/" element={<RegistrationPage />}/>
        <Route path="modelings/cart/" element={<CartPage />}/>
        <Route path="modelings/applications/" element={<ApplicationsPage />}/>
        <Route path="/modelings/applications/:id/" element={<AppDetail />}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </RouterComponent>
  </Provider>,
  document.getElementById('root')
);
