/* eslint-disable arrow-parens */
import React, { useState, useEffect } from "react";
import { Tabs, Button, Spin } from "antd";
import Exceise from "./Exceise/index.tsx";

const { TabPane } = Tabs;
const Hooks = () => {
  const [tab, changeTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(0);

  useEffect(() => {
    document.title = `tab${tab}`;
    return () => {
      document.title = `默认title`;
    };
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [data]); // 去掉第二个参数,会有警告,页面会有重复渲染
  return (
    <Spin spinning={loading}>
      <Tabs
        defaultActiveKey={tab}
        onChange={key => {
          changeTab(key);
        }}
      >
        <TabPane tab="Hooks基础" key="1">
          {`Data:${data}`}
          <Button
            onClick={() => {
              setData(data + 1);
            }}
            style={{ marginLeft: 10 }}
          >
            +1
          </Button>
        </TabPane>
        <TabPane tab="Hooks 练习" key="2">
          <Exceise />
        </TabPane>
      </Tabs>
    </Spin>
  );
};

export default Hooks;
