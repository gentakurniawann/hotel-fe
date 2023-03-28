import React from "react";
export default class Media extends React.Component {
  render() {
    return (
      <img
        src={process.env.PUBLIC_URL + "/assets/" + this.props.image}
        width={this.props.width}
        height={this.props.height}
        alt={this.props.alt}
      />
    );
  }
}
