import React, { Component } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon,Form } from "antd";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import FormItem from './pages/FormItem'
import Home from './pages/Home';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item>
              <Icon type="pie-chart" />
              <span> <Link to="/" style={{color: "white"}}>Home</Link></span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="desktop" />
              <span><Link to="/form" style={{color: "white"}}>FormWork</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
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
            <Breadcrumb style={{ margin: "8px 0" }}/>
            <div style={{ padding: 24, background: "#fff"}}>
                {/* <FormItem/> */}
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/form" component={FormItem}></Route>
                  {/* <Route></Route> */}
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
