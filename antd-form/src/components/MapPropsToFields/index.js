import React, { Component } from "react";
import { Form, Input } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
};
class MapPropsToFields extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator("uname", {
            rules: [{ required: true }]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator("pwd", {
            rules: [{ required: true }]
          })(<Input />)}
        </Form.Item>
      </React.Fragment>
    );
  }
}

export default Form.create({
  name: "mapPropsToFields",
  //   onFieldsChange(props, changedFields) {
  //     props.onChange(changedFields);
  //   },
  mapPropsToFields({ loginInfo }) {
    if (loginInfo) {
      const res = Object.keys(loginInfo).reduce(
        (pre, cur) => ({
          ...pre,
          [cur]: Form.createFormField({
            errors: loginInfo[`${cur}_error`],
            value: loginInfo[cur]
          }) // 返回的是一个对象
        }),
        {}
      );
      return res;
    }

    // return {
    //   username: Form.createFormField({
    //     ...props.username,
    //     value: props.username.value
    //   })
    // };
  }
  //   onValuesChange(_, values) {
  //     console.log(values);
  //   }
})(MapPropsToFields);
