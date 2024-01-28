import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import {MyScenariosPage} from "./pages/MyScenariosPage/MyScenariosPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage/RegistrationPage";
import {ScenarioCreateEditPage} from "./pages/ScenarioCreateEditPage/ScenarioCreateEditPage";
import {Main} from "components";
import {Path} from "enums";

export const AppRouter = () => {
    return (
            <Routes>
                <Route path="" element={<Main/>}>
                    <Route path={Path.Root} element={<HomePage />} />
                    <Route path={Path.MyScenarios} element={<MyScenariosPage />} />
                    <Route path={Path.Login} element={<LoginPage />} />
                    <Route path={Path.Registration} element={<RegistrationPage />} />
                    <Route path={Path.CreateScenario} element={<ScenarioCreateEditPage />} />
                    <Route path={`${Path.EditScenario}/:scenarioId`} element={<ScenarioCreateEditPage />} />
                </Route>
            </Routes>
    );
};
