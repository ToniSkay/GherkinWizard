import React from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import {MyScenariosPage} from "./pages/MyScenariosPage/MyScenariosPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage/RegistrationPage";
import {ScenarioCreationPage} from "./pages/ScenarioCreationPage/ScenarioCreationPage";
import {Main} from "./common/components/Main/Main";

export const AppRouter = () => {
    return (
            <Routes>
                <Route path="" element={<Main/>}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/all-tasks" element={<MyScenariosPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/create-scenario" element={<ScenarioCreationPage />} />
                </Route>
            </Routes>
    );
};
