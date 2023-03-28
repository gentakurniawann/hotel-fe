import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import RoomTable from "../../component/table/roomTable";
import Media from "../../component/media/media";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      kamar: [],
      filterKamar: [],
      tipe_kamar: [],
      id_kamar: "",
      id_tipe_kamar: "",
      nomor_kamar: 0,
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

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  search = (e) => {
    // console.log("search");
    if (e.keyCode === 13) {
      let search = this.state.search.toLowerCase();
      let result = this.state.kamar.filter((item) => {
        return (
          item.id_kamar.toString().includes(search) ||
          item.tipe_kamar.nama_tipe_kamar.toLowerCase().includes(search) ||
          item.nomor_kamar.toString().includes(search)
        );
      });
      this.setState({
        filterKamar: result,
      });
    }
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      id_tipe_kamar: "",
      nomor_kamar: "",
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_kamar: selectedItem.id_kamar,
      id_tipe_kamar: selectedItem.id_tipe_kamar,
      nomor_kamar: selectedItem.nomor_kamar,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let data = {
      id_tipe_kamar: this.state.id_tipe_kamar,
      nomor_kamar: this.state.nomor_kamar,
    };
    let url = "";

    if (this.state.action === "insert") {
      url = "http://localhost:2604/kamar";

      axios
        .post(url, data, this.headerConfig())
        .then((res) => {
          this.getRoom();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url = "http://localhost:2604/kamar/" + this.state.id_kamar;
      axios
        .put(url, data, this.headerConfig())
        .then((res) => {
          this.getRoom();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  handleDelete = (id_kamar) => {
    let url = "http://localhost:2604/kamar/" + id_kamar;

    if (window.confirm("Are you sure to delete this data ?")) {
      axios
        .delete(url, this.headerConfig())
        .then((res) => {
          console.log(res.message);
          this.getRoom();
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

  getRoom = () => {
    let url = "http://localhost:2604/kamar";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          kamar: res.data.kamar,
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
      prevState.kamar !== this.state.kamar ||
      (prevState.search !== this.state.search && this.state.search === "")
    ) {
      this.setState({
        filterKamar: this.state.kamar,
      });
    }
  }

  componentDidMount = () => {
    this.getUserLogin();
    this.getRoom();
    this.getRoomType();
  };
  render() {
    if (this.state.roleUser === "admin") {
      return (
        <div className="room">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Room</h1>
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
                        <th scope="col">ROOM TYPE</th>
                        <th scope="col">ROOM NUMBER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.filterKamar.map((item, index) => {
                        return (
                          <RoomTable
                            key={index}
                            no={index + 1}
                            id_kamar={item.id_kamar}
                            nama_tipe_kamar={item.tipe_kamar.nama_tipe_kamar}
                            nomor_kamar={item.nomor_kamar}
                            onEdit={() => this.handleEdit(item)}
                            onDelete={() => this.handleDelete(item.id_kamar)}
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
                  Input Data Room
                </Modal.Title>
              ) : (
                <Modal.Title className="modalTitle">Edit Data Room</Modal.Title>
              )}
            </Modal.Header>
            <Form onSubmit={(e) => this.handleSave(e)}>
              <Modal.Body className="modal-body">
                <Form.Group controlId="id_tipe_kamar">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="id_tipe_kamar"
                    onChange={this.handleChange}
                    required
                  >
                    <option>Select Room Type</option>
                    {this.state.tipe_kamar.map((item, index) => {
                      if (item.id_tipe_kamar === this.state.id_tipe_kamar) {
                        let selected = true;
                        return (
                          <option
                            value={item.id_tipe_kamar}
                            selected={selected}
                          >
                            {item.nama_tipe_kamar}
                          </option>
                        );
                      } else {
                        let selected = false;
                        return (
                          <option
                            value={item.id_tipe_kamar}
                            selected={selected}
                          >
                            {item.nama_tipe_kamar}
                          </option>
                        );
                      }
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="nomor_kamar">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="nomor_kamar"
                    placeholder="Insert Room Number"
                    value={this.state.nomor_kamar}
                    onChange={this.handleChange}
                    required
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
