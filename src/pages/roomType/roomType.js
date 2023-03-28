import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import RoomTypeTable from "../../component/table/roomTypeTable";
import Media from "../../component/media/media";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default class RoomType extends React.Component {
  constructor() {
    super();
    this.state = {
      tipe_kamar: [],
      filter_tipe_kamar: [],
      id_tipe_kamar: "",
      nama_tipe_kamar: "",
      harga: 0,
      deskripsi: "",
      foto: null,
      token: "",
      userName: "",
      roleUser: "",
      isModalOpen: false,
      action: "",
      search: "",
    };
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/login";
    }
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFile = (e) => {
    this.setState({
      foto: e.target.files[0],
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  search = (e) => {
    // console.log('search')
    if (e.keyCode === 13) {
      let search = this.state.search.toLowerCase();
      let result = this.state.tipe_kamar.filter((item) => {
        return (
          item.id_tipe_kamar.toString().includes(search) ||
          item.nama_tipe_kamar.toLowerCase().includes(search) ||
          item.harga.toString().includes(search)
        );
      });
      this.setState({
        filter_tipe_kamar: result,
      });

      console.log(result);
    }
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama_tipe_kamar: "",
      harga: "",
      deskripsi: "",
      foto: null,
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_tipe_kamar: selectedItem.id_tipe_kamar,
      nama_tipe_kamar: selectedItem.nama_tipe_kamar,
      harga: selectedItem.harga,
      deskripsi: selectedItem.deskripsi,
      foto: null,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_tipe_kamar", this.state.nama_tipe_kamar);
    form.append("harga", this.state.harga);
    form.append("deskripsi", this.state.deskripsi);
    form.append("foto", this.state.foto);

    let url = "";

    if (this.state.action === "insert") {
      url = "http://localhost:2604/tipe_kamar";

      axios
        .post(url, form, this.headerConfig())
        .then((res) => {
          this.getRoomType();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url = "http://localhost:2604/tipe_kamar/" + this.state.id_tipe_kamar;
      axios
        .put(url, form, this.headerConfig())
        .then((res) => {
          this.getRoomType();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  handleDelete = (id_tipe_kamar) => {
    let url = "http://localhost:2604/tipe_kamar/" + id_tipe_kamar;

    if (window.confirm("Are you sure to delete this data ?")) {
      axios
        .delete(url, this.headerConfig())
        .then((res) => {
          console.log(res.message);
          this.getRoomType();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  getUserLogin = () => {
    let id_user = localStorage.getItem("id_user");
    let roleUser = localStorage.getItem("role");
    let url = "http://localhost:2604/user/" + id_user;
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          userName: res.data.user.nama_user,
          roleUser: roleUser,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getRoomType = () => {
    let url = "http://localhost:2604/tipe_kamar";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          tipe_kamar: res.data.tipe_kamar,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.tipe_kamar !== this.state.tipe_kamar ||
      (prevState.search !== this.state.search && this.state.search === "")
    ) {
      this.setState({
        filter_tipe_kamar: this.state.tipe_kamar,
      });
    }
  }

  componentDidMount = () => {
    this.getUserLogin();
    this.getRoomType();
  };
  render() {
    if (this.state.roleUser === "admin") {
      return (
        <div className="roomType">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Room Type</h1>
              <Link to="/profile">
                <div className="profile-bar d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-profile.svg"
                      alt="icon-profile.svg"
                    ></Media>
                  </div>
                  <p>{this.state.userName}</p>
                </div>
              </Link>
            </div>
            <div className="card">
              <div className="card-body">
                <div className=" header d-flex justify-content-between align-items-center">
                  <div className="d-flex search">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="search"
                      placeholder="Search"
                      aria-label=".form-control-lg"
                      onChange={this.handleChange}
                      onKeyUp={(e) => this.search(e)}
                    />
                    <div className="my-2" style={{ marginLeft: "-48px" }}>
                      <Media
                        value
                        image="icon-search.svg"
                        alt="icon-search.svg"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-md btn-add"
                    onClick={() => this.handleAdd()}
                  >
                    <span className="me-1">
                      <Media value image="icon-add.svg" alt="icon-add.svg" />
                    </span>
                    Add Data
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table mt-4">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">ID</th>
                        <th scope="col">FOTO</th>
                        <th scope="col">ROOM NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.filter_tipe_kamar.map((item, index) => {
                        return (
                          <RoomTypeTable
                            key={index}
                            no={index + 1}
                            id_tipe_kamar={item.id_tipe_kamar}
                            foto={
                              "http://localhost:2604/image/tipe_kamar/" +
                              item.foto
                            }
                            nama_tipe_kamar={item.nama_tipe_kamar}
                            harga={item.harga}
                            deskripsi={item.deskripsi}
                            onEdit={() => this.handleEdit(item)}
                            onDelete={() =>
                              this.handleDelete(item.id_tipe_kamar)
                            }
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <Modal
            classname="modal"
            show={this.state.isModalOpen}
            onHide={this.handleClose}
          >
            <Modal.Header classname="modal-header" closeButton>
              {this.state.action === "insert" ? (
                <Modal.Title className="modalTitle">
                  Input Data Room Type
                </Modal.Title>
              ) : (
                <Modal.Title className="modalTitle">
                  Edit Data Room Type
                </Modal.Title>
              )}
            </Modal.Header>
            <Form onSubmit={(e) => this.handleSave(e)}>
              <Modal.Body className="modal-body">
                <Form.Group controlId="nama_tipe_kamar">
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_tipe_kamar"
                    placeholder="Insert Room Name"
                    value={this.state.nama_tipe_kamar}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="harga">
                  <Form.Label>harga</Form.Label>
                  <Form.Control
                    type="number"
                    name="harga"
                    placeholder="Input Price"
                    value={this.state.harga}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="deskripsi">
                  <Form.Label>Deskripsi</Form.Label>
                  <textarea
                    type="text"
                    name="deskripsi"
                    className="form-control"
                    placeholder="Input Description"
                    value={this.state.deskripsi}
                    onChange={this.handleChange}
                    style={{ height: "160px" }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="Image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="Image"
                    placeholder="Insert Image"
                    value={this.state.Foto}
                    onChange={this.handleFile}
                    style={{ lineHeight: "32px" }}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer classname="modal-footer">
                <button className="btn btn-md btn-submit" type="submit">
                  save
                </button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      );
    } else if (this.state.roleUser === "resepsionis") {
      window.location = "/";
    }
  }
}
