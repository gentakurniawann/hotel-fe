import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import UserTable from "../../component/table/userTable";
import Media from "../../component/media/media";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { Prev } from "react-bootstrap/esm/PageItem";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      filterUser: [],
      id_user: "",
      nama_user: "",
      email: "",
      password: "",
      role: "",
      roleChoice: [{ role: "admin" }, { role: "resepsionis" }],
      foto: null,
      token: "",
      userName: "",
      roleUser: "",
      isModalOpen: false,
      action: "",
      search: "",
    };
    if (this.state.user !== "") {
      this.setState({
        filterUser: this.state.user,
      });
    }
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
      let result = this.state.user.filter((item) => {
        return (
          item.id_user.toString().includes(search) ||
          item.nama_user.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.role.toLowerCase().includes(search)
        );
      });
      this.setState({
        filterUser: result,
      });
    }
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama_user: "",
      email: "",
      password: "",
      role: "",
      foto: null,
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_user: selectedItem.id_user,
      nama_user: selectedItem.nama_user,
      email: selectedItem.email,
      password: "",
      role: selectedItem.role,
      foto: null,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_user", this.state.nama_user);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    form.append("foto", this.state.foto);

    let url = "";

    if (this.state.action === "insert") {
      url = "http://localhost:2604/user";

      axios
        .post(url, form, this.headerConfig())
        .then((res) => {
          this.getUser();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url = "http://localhost:2604/user/" + this.state.id_user;
      axios
        .put(url, form, this.headerConfig())
        .then((res) => {
          this.getUser();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  handleDelete = (id_user) => {
    let url = "http://localhost:2604/user/" + id_user;

    if (window.confirm("Are you sure to delete this data ?")) {
      axios
        .delete(url, this.headerConfig())
        .then((res) => {
          console.log(res.message);
          this.getUser();
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

  getUser = () => {
    let url = "http://localhost:2604/user";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          user: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.user !== this.state.user ||
      (prevState.search !== this.state.search && this.state.search === "")
    ) {
      this.setState({
        filterUser: this.state.user,
      });
    }
  }

  componentDidMount = () => {
    this.getUserLogin();
    this.getUser();
  };

  render() {
    console.log(this.state.roleUser);
    if (this.state.roleUser === "admin") {
      return (
        <div className="user">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>User</h1>
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
                        <th scope="col">NAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ROLE</th>
                        <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.filterUser.map((item, index) => {
                        return (
                          <UserTable
                            key={index}
                            no={index + 1}
                            id_user={item.id_user}
                            foto={
                              "http://localhost:2604/image/user/" + item.foto
                            }
                            nama_user={item.nama_user}
                            email={item.email}
                            role={item.role}
                            onEdit={() => this.handleEdit(item)}
                            onDelete={() => this.handleDelete(item.id_user)}
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
                  Input Data User
                </Modal.Title>
              ) : (
                <Modal.Title className="modalTitle">Edit Data User</Modal.Title>
              )}
            </Modal.Header>
            <Form onSubmit={(e) => this.handleSave(e)}>
              <Modal.Body className="modal-body">
                <Form.Group controlId="nama_user">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_user"
                    placeholder="Insert Your Name"
                    value={this.state.nama_user}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="*******"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required={this.state.action === "insert" ? true : false}
                  />
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    className="form-control"
                    name="role"
                    onChange={this.handleChange}
                    required
                  >
                    <option>Select Role</option>
                    {this.state.roleChoice.map((item, index) => {
                      if (item.role === this.state.role) {
                        let selected = true;
                        return (
                          <option value={item.role} selected={selected}>
                            {item.role}
                          </option>
                        );
                      } else {
                        let selected = false;
                        return (
                          <option value={item.role} selected={selected}>
                            {item.role}
                          </option>
                        );
                      }
                    })}
                  </Form.Select>
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
