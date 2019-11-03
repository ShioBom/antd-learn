import React, { Component } from "react";
import MyComponent from "./MyComponent";

class Father extends Component {
  ref;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.ref);
  }
  onRef=(ref)=>{
      this.ref=ref;
  }
  render() {
    return (
      <div>
        <MyComponent onRef={this.onRef} />
      </div>
    );
  }
}

export default Father;
