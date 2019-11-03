import React, { Component } from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 21 }
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 21, offset: 3 }
  }
};
export default class MultiLanguage extends Component {
  constructor(props) {
    super(props);
    const { language, inputTxt } = props.formItem;
    this.state = {
      language: language || "chinese",
      inputTxt: inputTxt || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.table(nextProps.formItem);
    // Should be a controlled component.
    if ("formItem" in nextProps) {
      const formItem = nextProps.formItem;
      this.setState(formItem);
    }
  }

  handleDel = () => {
    const { index, handleDel } = this.props;
    handleDel(index);
  };

  // 自定义校验
  checkLanguage = (rule, value, callback) => {
    // 如果输入框为空,则显示错误信息,否则校验通过
    if (value) {
      callback();
      return;
    } else {
      callback("请输入多语言");
    }
    callback();
  };

  handleInputChange = e => {
    const inputTxt = e.target.value;
    if (!("formItem" in this.props)) {
      this.setState({ inputTxt });
    }
    this.triggerChange({ inputTxt }); // 改变form表单项的值
  };

  handleLanguageChange = language => {
    if (!("formItem" in this.props)) {
      this.setState({ language });
    }
    this.triggerChange({ language });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { index, onChange } = this.props;
    if (onChange) {
      onChange(index, { ...this.state, ...changedValue });
    }
  };

  render() {
    const { index, form, formNames, handleAdd } = this.props;
    const { language, inputTxt } = this.state;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Form.Item
          label={index === 0 ? "多语言" : null}
          {...(index !== 0 ? formItemLayoutWithOutLabel : formItemLayout)}
          style={{marginBottom: 0}}
        >
          {getFieldDecorator(`language${index}`, {
            rules: [{ required: true, validator: this.checkLanguage }]
          })(
            <Row gutter={8}>
              <Col span={5}>
                <Select
                  value={language}
                  disabled={index !== formNames.length - 1}
                  onChange={this.handleLanguageChange}
                  style={{ position: "relative" }}
                >
                  <Option value="chinese">简体中文</Option>
                  <Option value="english">English</Option>
                  <Option value="japanese">日本語</Option>
                </Select>
                {index + 1 === formNames.length ? (
                  <span
                    style={{
                      color: "red",
                      position: "absolute",
                      bottom: -40,
                      left: 5,
                    }}
                    onClick={handleAdd}
                  >
                    + 添加语言
                  </span>
                ) : null}
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  value={inputTxt}
                  onChange={this.handleInputChange}
                />
              </Col>
              {index !== 0 ? (
                <Col span={4}>
                  <Button onClick={this.handleDel}>删除</Button>
                </Col>
              ) : null}
            </Row>
          )}
        </Form.Item>
      </React.Fragment>
    );
  }
}
