import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import CustomerTable from "../../component/table/customerTable";
import Media from "../../component/media/media";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default class Customer extends React.Component {
  constructor() {
    super();
    this.state = {
      customer: [],
      filterCustomer: [],
      id_customer: "",
      nama_customer: "",
      nik: "",
      jenis_kelamin: "",
      jkChoice: [{ jk: "L" }, { jk: "P" }],
      email: "",
      password: "",
      foto: null,
      token: "",
      userName: "",
      roleUser: "",
      isModalOpen: false,
      action: "",
      search: "",
    };
    if (this.state.customer !== "") {
      this.setState({
        filterCustomer: this.state.customer,
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
      let result = this.state.customer.filter((item) => {
        return (
          item.id_customer.toString().includes(search) ||
          item.nama_customer.toLowerCase().includes(search) ||
          item.nik.toString().includes(search) ||
          item.jenis_kelamin.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)
        );
      });
      this.setState({
        filterCustomer: result,
      });
    }
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama_customer: "",
      nik: "",
      jenis_kelamin: "",
      email: "",
      password: "",
      foto: null,
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_customer: selectedItem.id_customer,
      nama_customer: selectedItem.nama_customer,
      nik: selectedItem.nik,
      jenis_kelamin: selectedItem.jenis_kelamin,
      email: selectedItem.email,
      password: "",
      foto: null,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_customer", this.state.nama_customer);
    form.append("nik", this.state.nik);
    form.append("jenis_kelamin", this.state.jenis_kelamin);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("foto", this.state.foto);

    let url = "";

    if (this.state.action === "insert") {
      url = "http://localhost:2604/customer";

      axios
        .post(url, form, this.headerConfig())
        .then((res) => {
          this.getCustomer();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url = "http://localhost:2604/customer/" + this.state.id_customer;
      axios
        .put(url, form, this.headerConfig())
        .then((res) => {
          this.getCustomer();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  handleDelete = (id_user) => {
    let url = "http://localhost:2604/customer/" + id_user;

    if (window.confirm("Are you sure to delete this data ?")) {
      axios
        .delete(url, this.headerConfig())
        .then((res) => {
          console.log(res.message);
          this.getCustomer();
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

  getCustomer = () => {
    let url = "http://localhost:2604/customer";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          customer: res.data.customer,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.customer !== this.state.customer ||
      (prevState.search !== this.state.search && this.state.search === "")
    ) {
      this.setState({
        filterCustomer: this.state.customer,
      });
    }
  }

  componentDidMount = () => {
    this.getUserLogin();
    this.getCustomer();
  };
  render() {
    return (
      <div className="customer">
        <SidebarMain />
        <div className="container">
          <div className="content-header d-flex align-items-center justify-content-between">
            <h1>Customer</h1>
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
              </div>
              <div className="table-responsive">
                <table className="table mt-4">
                  <thead>
                    <tr>
                      <th scope="col">NO</th>
                      <th scope="col">ID</th>
                      <th scope="col">FOTO</th>
                      <th scope="col">NAME</th>
                      <th scope="col">NIK</th>
                      <th scope="col">GENDER</th>
                      <th scope="col">EMAIL</th>
                      <th
                        scope="col"
                        style={
                          this.state.roleUser === "admin"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filterCustomer.map((item, index) => {
                      if (this.state.roleUser === "admin") {
                        return (
                          <CustomerTable
                            key={index}
                            no={index + 1}
                            id_customer={item.id_customer}
                            foto={
                              "http://localhost:2604/image/customer/" +
                              item.foto
                            }
                            nama_customer={item.nama_customer}
                            nik={item.nik}
                            jenis_kelamin={item.jenis_kelamin}
                            email={item.email}
                            className="customer-admin"
                            onEdit={() => this.handleEdit(item)}
                            onDelete={() => this.handleDelete(item.id_customer)}
                          />
                        );
                      } else if (this.state.roleUser === "resepsionis") {
                        return (
                          <CustomerTable
                            key={index}
                            no={index + 1}
                            id_customer={item.id_customer}
                            foto={
                              "http://localhost:2604/image/customer/" +
                              item.foto
                            }
                            nama_customer={item.nama_customer}
                            nik={item.nik}
                            jenis_kelamin={item.jenis_kelamin}
                            email={item.email}
                            onEdit={() => this.handleEdit(item)}
                            onDelete={() => this.handleDelete(item.id_customer)}
                          />
                        );
                      }
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
                Input Data Customer
              </Modal.Title>
            ) : (
              <Modal.Title className="modalTitle">
                Edit Data Customer
              </Modal.Title>
            )}
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body className="modal-body">
              <Form.Group controlId="nama_customer">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_customer"
                  placeholder="Insert Your Name"
                  value={this.state.nama_customer}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="nik">
                <Form.Label>NIK</Form.Label>
                <Form.Control
                  type="number"
                  name="nik"
                  placeholder="Insert NIK"
                  value={this.state.nik}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="jenis_kelamin">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className="form-control"
                  name="jenis_kelamin"
                  onChange={this.handleChange}
                >
                  <option>Select Gender</option>
                  {this.state.jkChoice.map((item, index) => {
                    if (item.jk === this.state.jenis_kelamin) {
                      let selected = true;
                      return (
                        <option value={item.jk} selected={selected}>
                          {item.jk}
                        </option>
                      );
                    } else {
                      let selected = false;
                      return (
                        <option value={item.jk} selected={selected}>
                          {item.jk}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={this.state.email}
                  onChange={this.handleChange}
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
                />
              </Form.Group>
              <Form.Group controlId="Image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="foto"
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
  }
}
