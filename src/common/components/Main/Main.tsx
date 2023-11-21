import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Header as CustomHeader} from "../Header/Header";
import {Outlet} from "react-router-dom";

export const Main = () => {
    return (
        <Layout>
            <Header className={"header"} style={{ backgroundColor: "transparent" }}>
                <CustomHeader></CustomHeader>
            </Header>

            <Content className={"main-content"}>
                <Outlet/>
            </Content>
        </Layout>
    );
};
