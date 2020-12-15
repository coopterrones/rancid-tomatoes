import React, { Component } from "react";

class Loading extends Component {
  static style = ({ props }) => ({
    border: "10px solid #FDFFFC",
    borderRadius: "100%",
    height: props.diameter,
    left: "50%",
    opacity: props.opacity,
    position: "absolute",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    width: props.diameter,
    zIndex: 1
  });

  handleRest = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default Loading;