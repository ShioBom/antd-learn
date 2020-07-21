import React, { useState } from "react";
import { Card, Button, Input, Form, Row, Col } from "antd";
import useCounter from "../../../components/Hooks/useCounter";

// const FormItem = Form.Item;
const CounterCard = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [count, { inc, dec, set, reset }] = useCounter(-2, { min: 0, max: 20 });

  const buttonMap = [
    {
      label: "加 1",
      key: "add",
      callback: () => {
        inc(1);
      }
    },
    {
      label: "减 1",
      key: "minus",
      callback: () => {
        dec(1);
      }
    },
    {
      label: "设置为 5",
      key: "set",
      callback: () => {
        set(5);
      }
    },
    {
      label: "重置",
      key: "reset",
      callback: () => {
        reset();
      }
    }
  ];

  return (
    <>
      <Row style={{margin:10}}>
        <Col span={9}>
          最小值:
          <Input
            style={{ width: 50 }}
            value={min}
            onChange={e => {
              const { value } = e.target;
              console.log(value)
              setMin(Number(value));
            }}
          />
        </Col>
        <Col span={6}>当前值:{count}</Col>
        <Col span={9}>
          最大值:
          <Input
            style={{ width: 50 }}
            value={max}
            onChange={e => {
              const { value } = e.target;
              setMax(Number(value));
            }}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        {buttonMap.map(btn => (
          <Col span={6}>
            <Button key={btn.key} onClick={btn.callback}>
              {btn.label}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};

const Exceise = () => {
  return (
    <>
      <Card title="useCounter" style={{ width: 500 }}>
        <CounterCard key="counterCard" />
      </Card>
    </>
  );
};

export default Exceise;
