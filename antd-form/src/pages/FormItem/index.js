import React from "react";
import { Form, Button, Icon } from "antd";

import PriceInput from './PriceInput';

// FIXME: 新增按钮的样式

let id = 0;
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  add = () => {
    const { form } = this.props;
    const { validateFields, getFieldValue, setFieldsValue } = form;
    // can use data-binding to get
    validateFields((err) => {
      if (!err) {
        const Keys = getFieldValue("keys");
        const nextKeys = Keys.concat(id++);
        setFieldsValue({
          keys: nextKeys,
        });
      }
    });
  };

  handleSubmit = () => {
    const { form } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        const { keys, formDatas } = values;
        console.log("Merged values:", keys.map((key) => formDatas[key]));
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number === "" || value.language === "") {
      callback();
      return;
    }
    callback("Price must greater than zero!");
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 23, offset: 1 },
    //   },
    // };
    const formItemLayout = {
      labelCol: {
        // xs: { span: 24 },
        sm: { span: 1 },
      },
      wrapperCol: {
        // xs: { span: 24 },
        sm: { span: 23 },
      },
    };
    getFieldDecorator("keys", {
      initialValue: [],
    });
    const formDatas = getFieldValue("keys");
    const formItems = formDatas.map((k) => (
      <Form.Item
        {...formItemLayout}
        label={k === 0 ? "名称" : ""}
        key={k}
      >
        {getFieldDecorator(`formDatas[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              // whitespace: true,
              message: "请输入完整的多语言信息",
            },
          ],
        })(
          <PriceInput
            formDatas={formDatas}
            k={k}
            form={form}
            key={k}
          />
        )}
      </Form.Item>
    ));

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" />
            <span>Add field</span>
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: "customized_form_controls" })(Demo);
export default WrappedDemo;
