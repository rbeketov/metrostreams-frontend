import {BrowserRouter, Route, Routes} from "react-router-dom";
import ModelingsPage from './components/ModelingsPage.tsx';
import ModelingsDetailsPage from './components/ModelingsDetailsPage.tsx';
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
            <Routes>
                <Route path="/modelings/" element={<ModelingsPage />}/>
                <Route path="/modelings/:id/" element={<ModelingsDetailsPage />} />
            </Routes>
    </BrowserRouter>
);