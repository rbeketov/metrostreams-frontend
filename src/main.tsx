import React from 'react';
import ReactDOM from 'react-dom';
import ModelingsPage from './components/ModelingsPage.tsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {HashRouter, Route, Routes} from "react-router-dom";
import './index.css';


const base_path = process.env.GITHUB_ACTIONS ? 'metrostreams-frontend/' : '/';
// const FlexibleRouter = process.env.GITHUB_ACTIONS ? HashRouter : BrowserRouter;


function RedirectComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("modelings/");
  }, [navigate]);
  return null;
}

if (process.env.GITHUB_ACTIONS) {
  ReactDOM.render(
    <HashRouter>
      <Routes>
        <Route path={base_path} element={<RedirectComponent />}/>
        <Route path="modelings/" element={<ModelingsPage />}/>
        <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
      </Routes>
    </HashRouter>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path={base_path} element={<RedirectComponent />}/>
        <Route path="modelings/" element={<ModelingsPage />}/>
        <Route path="modelings/:id/" element={<ModelingsDetailsPage />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
}