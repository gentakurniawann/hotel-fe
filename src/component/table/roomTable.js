import React from "react";
import Media from "../media/media";

export default class RoomTable extends React.Component {
  render() {
    return (
      <tr className={this.props.className}>
        <td>{this.props.no}</td>
        <td>{this.props.id_kamar}</td>
        <td>{this.props.nama_tipe_kamar}</td>
        <td>{this.props.nomor_kamar}</td>
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
