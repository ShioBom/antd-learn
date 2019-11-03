import React, { Component } from "react";
import { Form, Input, Button } from "antd";


class MyComponent extends Component {
  constructor(props) {
    super(props);
    props.onRef(this);
    this.state={

    }
  }
  render() {
    return (
      <div>
        <Form>
          <Button>按钮</Button>
        </Form>
      </div>
    );
  }
}
export default Form.create()(MyComponent);
