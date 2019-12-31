import React from "react";
import "./App.css";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Home";
import Project from "./Project";
import { Layout, Typography, ConfigProvider } from "antd";
import moment from "moment";
import zhCN from 'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={createBrowserHistory()}>
        <Layout style={{ height: "100%", width: "100%" }}>
          <Layout.Header style={{ background: "#fff" }}>
            <Link to="/">
              <Typography.Title level={3}>敏捷实践系统</Typography.Title>
            </Link>
          </Layout.Header>
          <Layout.Content style={{ height: "calc(100% - 64px)" }}>
            <Switch>
              <Route path="/project/:projectId" component={Project} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
