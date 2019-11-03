import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import TableLearn from "./pages/TableLearn";
import Portals from './components/Portals'
import TextEditor from "./components/TextEditor";
import LessLearn from "./components/LessLearn";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item>
                  <Icon type="pie-chart" />
                  <span>
                    <Link to="/" style={{ color: "white" }}>
                      Home
                    </Link>
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <Icon type="desktop" />
                  <span>
                    <Link to="/form" style={{ color: "white" }}>
                      FormWork
                    </Link>
                  </span>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    (
                      <span>
                        <Icon type="user" />
                        <span>User</span>
                      </span>
                    )
                  }
                >
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    (
                      <span>
                        <Icon type="user" />
                        <span>User</span>
                      </span>
                    )
                  }
                >
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }} />
              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "8px 0" }} />
                <div style={{ padding: 24, background: "#fff" }}>
                  {/* <FormItem/> */}
                  <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/form" component={FormItem} /> */}
                    <Route exact path="/form" component={TableLearn} />
                    <Route exact path="/portals" component={Portals} />
                    <Route exact path="/text-editor" component={TextEditor} />
                    <Route exact path="/less" component={LessLearn} />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
