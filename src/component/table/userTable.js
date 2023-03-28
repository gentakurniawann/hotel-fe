import React from "react";
import Media from "../media/media";

export default class UserTable extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.no}</td>
        <td>{this.props.id_user}</td>
        <td>
          <img
            alt={this.props.nameimage}
            src={this.props.foto}
            width="40px"
            height="40px"
            style={{ borderRadius: "50%" }}
          />
        </td>
        <td>{this.props.nama_user}</td>
        <td>{this.props.email}</td>
        <td>{this.props.role}</td>
        <td style={{ minWidth: "120px" }}>
          <button className="btn btn-edit mx-1" onClick={this.props.onEdit}>
            <Media value image="icon-edit.svg" alt="icon-edit.svg" />
          </button>
          <button className="btn btn-delete mx-1" onClick={this.props.onDelete}>
            <Media value image="icon-delete.svg" alt="icon-delete.svg" />
          </button>
        </td>
      </tr>
    );
  }
}
