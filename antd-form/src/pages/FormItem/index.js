import React, { Component } from "react";
import { Form, Input, Select, Button,Icon } from "antd";
import styles from './index.less'
// FIXME: 新增按钮的样式
const { Option } = Select;
let id=0;
class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      number: value.number || "",
      language: value.language || "chinese"
    };
  }

  handleNumberChange = e => {
    const number = e.target.value;
    if (!("value" in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = language => {
    if (!("value" in this.props)) {
      this.setState({ language });
    }
    this.triggerChange({ language });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };
  remove = k => {
    const { form } = this.props;

    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    console.log(keys);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  render() {
    const { size ,formDatas,k} = this.props;
    const { state } = this;
    return (
      <div style={{ width: "80%" }}>
        <Select
          value={state.language}
          size={size}
          style={{ width: "20%", marginRight: "3%" }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="chinese">简体中文</Option>
          <Option value="english">English</Option>
          <Option value="japanese">日本語</Option>
        </Select>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: "60%", marginRight: "3%" }}
        />
        {formDatas.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(k)}
        />
      ) : null}
      </div>
    );
  }
}

class Demo extends React.Component {
 
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
   
    form.validateFields((err, values) => {
      if (!err) {
        const Keys = form.getFieldValue('keys');
        const nextKeys = Keys.concat(id++);
            form.setFieldsValue({
              keys: nextKeys,
            });
      }
    });
    
   
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, formDatas } = values;
        console.log('Merged values:', keys.map(key => formDatas[key]));
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
    const { getFieldDecorator ,getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 23, offset: 1 },
      },
    };
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
      initialValue: [
      ]
    });
    const formDatas = getFieldValue("keys");
    const formItems = formDatas.map((k,index)=>(
      <Form.Item  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={k === 0 ? '名称' : ''} key={k}>
      {getFieldDecorator(`formDatas[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            // whitespace: true,
            message: "请输入完整的多语言信息",
          },
        ],
      })(<PriceInput formDatas={formDatas} k={k} form={this.props.form} key={k}/>)}
      </Form.Item>)
    )
    
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
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
