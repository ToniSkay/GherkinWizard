import React from "react";
import {Header as CustomHeader} from "./common/components/Header/Header";
import "./index.scss";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import axios from "axios";
import {AppRouter} from "./AppRouter";

function App() {
    if (localStorage.getItem("user") !== null) {
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization =  JSON.parse(localStorage.getItem("user"))?.token;

            return config;
        });
    }

  return (
    <Layout>
      <Header className={"header"} style={{ backgroundColor: "transparent" }}>
        <CustomHeader></CustomHeader>
      </Header>

      <Content className={"main-content"}>
          <AppRouter></AppRouter>
      </Content>
    </Layout>
  );
}

export default App;
