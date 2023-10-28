import React from "react";
import {Route, Routes} from "react-router-dom";
import {Header as CustomHeader} from "./common/components/Header/Header";
import "./index.scss";
import {HomePage} from "./pages/HomePage/HomePage";
import {MyScenariosPage} from "./pages/MyScenariosPage/MyScenariosPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {RegistrationPage} from "./pages/RegistrationPage/RegistrationPage";
import {ScenarioCreationPage} from "./pages/ScenarioCreationPage/ScenarioCreationPage";
import axios from "axios";

function App() {
    if (localStorage.getItem("user") !== null) {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization =  JSON.parse(localStorage.getItem("user")).token;

            return config;
        });
    }

  return (
    <Layout>
      <Header className={"header"} style={{ backgroundColor: "transparent" }}>
        <CustomHeader></CustomHeader>
      </Header>
      <Content className={"main-content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-tasks" element={<MyScenariosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/create-scenario" element={<ScenarioCreationPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
