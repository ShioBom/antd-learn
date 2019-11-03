import React from "react";
import ReactDOM from "react-dom";
// These two containers are siblings in the DOM

// Let's create a Modal component that is an abstraction around
// the portal API.
class Portals extends React.Component {
  modalRoot = document.getElementById("wrapper");
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement("div");
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    );
  }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)

    return (
      <div id="wrapper">
        <div className="app">
          This div has overflow: hidden.
          <button onClick={this.handleShow}>Show modal</button>
          {this.state.showModal ? (
            <Portals>
              <div className="modal">
                <div>
                  With a portal, we can render content into a different part of
                  the DOM, as if it were any other React child.
                </div>
                This is being rendered inside the #modal-container div.
                {this.state.showModal?'测试是否能访问modal':'不能访问'}
                <button onClick={this.handleHide}>Hide modal</button>
              </div>
            </Portals>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
