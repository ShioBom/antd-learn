import React, { Component } from "react";
import { Input, Select, Icon } from "antd";

const { Option } = Select;

export default class PriceInput extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      number: value.number || "",
      language: value.language || "chinese",
    };
  }

  handleNumberChange = (e) => {
    const number = e.target.value;
    if (!("value" in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = (language) => {
    if (!("value" in this.props)) {
      this.setState({ language });
    }
    this.triggerChange({ language });
  };

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...this.state, changedValue });
    }
  };

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    console.log(keys);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  render() {
    const { size, formDatas, k } = this.props;
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
