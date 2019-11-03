import React, { Component } from "react";
import { Col, Row, Form, Input } from "antd";
import MultiLanguage from "../../components/MultiLanguage";
import MapPropsToFields from "../../components/MapPropsToFields";

const formItemLayout = {
  labelCol: {
    xs: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 9 }
  }
};

var timer = null;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: [
        {
          language: "chinese",
          inputTxt: ""
        }
      ],
      Fields: {
        uname: "tangyu",
        pwd: "123"
      },
    };
  }

  handleAdd = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          initialValue: this.state.initialValue.concat([
            {
              language: "chinese",
              inputTxt: ""
            }
          ])
        });
      }
    });
  };

  handleDel = index => {
    this.setState({
      initialValue: this.state.initialValue.filter((item, ind) => ind !== index)
    });
  };

  handleChangeLanguages = (index, newLanguage) => {
    const newDatas = this.state.initialValue.map((item, ind) =>
      ind === index ? newLanguage : item
    );
    this.setState({ initialValue: [...newDatas] });
  };

  testDebounce = (e,delay) => {
    const val = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(()=>{
        this.setState({inputValue:val})
    }, delay);
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div style={{ height: 500 }}>
        <Form>
          <Row gutter={16}>
            <Col span={12} style={{ height: "100%" }}>
              <Form.Item label="封装多语言组件">
                {this.state.initialValue.map((item, ind) => {
                  return (
                    <MultiLanguage
                      form={form}
                      formItem={item}
                      key={ind}
                      index={ind}
                      handleDel={this.handleDel}
                      handleAdd={this.handleAdd}
                      formNames={this.state.initialValue}
                      onChange={this.handleChangeLanguages}
                    />
                  );
                })}
              </Form.Item>
            </Col>
            <Col span={12} style={{ height: "100%" }}>
              <Form.Item label="mapPropsToFields使用">
                <MapPropsToFields
                  loginInfo={this.state.Fields}
                ></MapPropsToFields>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Form.Item label="函数防抖" {...formItemLayout}>
              {getFieldDecorator("debounce", {
                rules: [{ required: true }]
              })(<Input onChange={(e)=>{this.testDebounce(e,500)}} />)}
            </Form.Item>
            <span>这里是input变化值:{this.state.inputValue}</span>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedDemo = Form.create({ name: "customized_form_controls" })(Home);
export default WrappedDemo;
