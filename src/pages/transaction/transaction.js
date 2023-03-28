import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import TransactionTable from "../../component/table/transactionTable";
import Media from "../../component/media/media";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      pemesanan: [],
      filterPemesanan: [],
      id_pemesanan: "",
      status_pemesanan: "",
      statusChoice: [
        { status: "baru" },
        { status: "check_in" },
        { status: "check_out" },
      ],
      tgl_check_in: "",
      tgl_check_out: "",
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
      let result = this.state.pemesanan.filter((item) => {
        return (
          item.id_pemesanan.toString().includes(search) ||
          item.id_customer.toString().includes(search) ||
          item.nomor_pemesanan.toString().includes(search) ||
          item.tipe_kamar.nama_tipe_kamar.toLowerCase().includes(search) ||
          item.tgl_pemesanan.toString().includes(search) ||
          item.nama_tamu.toLowerCase().includes(search) ||
          item.jumlah_kamar.toString().includes(search) ||
          item.status_pemesanan.toString().includes(search)
        );
      });
      this.setState({
        filterPemesanan: result,
      });
    }
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_pemesanan: selectedItem.id_pemesanan,
      status_pemesanan: selectedItem.status_pemesanan,
    });
  };

  filterByDate = (e) => {
    e.preventDefault();
    let data = {
      tgl_check_in: this.state.tgl_check_in,
      tgl_check_out: this.state.tgl_check_out,
    };
    let url = "http://localhost:2604/pemesanan/find/date";
    axios
      .post(url, data, this.headerConfig())
      .then((res) => {
        this.setState({
          filterPemesanan: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  handleClear = () => {
    this.getPemesanan();
    this.setState({
      tgl_check_in: "",
      tgl_check_out: "",
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    let data = {
      id_pemesanan: this.state.id_pemesanan,
      status_pemesanan: this.state.status_pemesanan,
    };
    let url = "http://localhost:2604/pemesanan/" + this.state.id_pemesanan;
    axios
      .put(url, data, this.headerConfig())
      .then((res) => {
        this.getPemesanan();
        this.handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
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

  getPemesanan = () => {
    let url = "http://localhost:2604/pemesanan";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          pemesanan: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.pemesanan !== this.state.pemesanan ||
      (prevState.search !== this.state.search && this.state.search === "")
    ) {
      this.setState({
        filterPemesanan: this.state.pemesanan,
      });
    }
  }

  componentDidMount = () => {
    this.getUserLogin();
    this.getPemesanan();
  };
  render() {
    return (
      <div className="transaction">
        <SidebarMain />
        <div className="container">
          <div className="content-header d-flex align-items-center justify-content-between">
            <h1>Transactions</h1>
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
              <div className=" header">
                <div
                  className="d-flex align-items-end mb-3"
                  style={{ gap: "16px" }}
                >
                  <form
                    className="form-filterDate d-flex align-items-end"
                    onSubmit={(e) => this.filterByDate(e)}
                    style={{ gap: "16px", flexWrap: "wrap" }}
                  >
                    <div className="tgl_check_in">
                      <label for="tgl_check_in" className="form-label">
                        Check In Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="tgl_check_in"
                        onChange={this.handleChange}
                        value={this.state.tgl_check_in}
                      />
                    </div>
                    <div className="tgl_check_out">
                      <label for="tgl_check_out" className="form-label">
                        Check Out Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="tgl_check_out"
                        onChange={this.handleChange}
                        value={this.state.tgl_check_out}
                      />
                    </div>
                    <button className="btn btn-apply" type="submit">
                      Apply
                    </button>
                  </form>
                  <button
                    className="btn btn-apply"
                    onClick={() => this.handleClear()}
                  >
                    Clear
                  </button>
                </div>
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
                      <th scope="col">ID Booking</th>
                      <th scope="col">ID Customer</th>
                      <th scope="col">Booking Number</th>
                      <th scope="col">Room Name</th>
                      <th scope="col">Booking Date</th>
                      <th scope="col">Check In Date</th>
                      <th scope="col">Check Out Date</th>
                      <th scope="col">Guest Name</th>
                      <th scope="col">Room Total</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th
                        scope="col"
                        style={
                          this.state.roleUser === "admin"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.filterPemesanan.map((item, index) => {
                      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                      const checkInDate = new Date(item.tgl_check_in);
                      const checkOutDate = new Date(item.tgl_check_out);
                      const dayTotal = Math.round(
                        (checkOutDate - checkInDate) / (1000 * 3600 * 24)
                      );
                      if (this.state.roleUser === "resepsionis") {
                        return (
                          <TransactionTable
                            key={index}
                            no={index + 1}
                            id_pemesanan={item.id_pemesanan}
                            id_customer={item.id_customer}
                            nomor_pemesanan={item.nomor_pemesanan}
                            nama_tipe_kamar={item.tipe_kamar.nama_tipe_kamar}
                            tgl_pemesanan={item.tgl_pemesanan}
                            tgl_check_in={item.tgl_check_in}
                            tgl_check_out={item.tgl_check_out}
                            nama_tamu={item.nama_tamu}
                            jumlah_kamar={item.jumlah_kamar}
                            harga={
                              item.tipe_kamar.harga *
                              item.jumlah_kamar *
                              dayTotal
                            }
                            status_pemesanan={item.status_pemesanan}
                            onEdit={() => this.handleEdit(item)}
                          />
                        );
                      } else {
                        return (
                          <TransactionTable
                            key={index}
                            no={index + 1}
                            id_pemesanan={item.id_pemesanan}
                            id_customer={item.id_customer}
                            nomor_pemesanan={item.nomor_pemesanan}
                            nama_tipe_kamar={item.tipe_kamar.nama_tipe_kamar}
                            tgl_pemesanan={item.tgl_pemesanan}
                            tgl_check_in={item.tgl_check_in}
                            tgl_check_out={item.tgl_check_out}
                            nama_tamu={item.nama_tamu}
                            jumlah_kamar={item.jumlah_kamar}
                            harga={
                              item.tipe_kamar.harga *
                              item.jumlah_kamar *
                              dayTotal
                            }
                            className="transaction-admin"
                            status_pemesanan={item.status_pemesanan}
                            onEdit={() => this.handleEdit(item)}
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
            <Modal.Title className="modalTitle">
              Edit Data Transaction
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body className="modal-body">
              <Form.Group controlId="status_pemesanan">
                <Form.Label>Booking Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="form-control"
                  name="status_pemesanan"
                  onChange={this.handleChange}
                  required
                >
                  <option>Select Booking Status</option>
                  {this.state.statusChoice.map((item, index) => {
                    if (item.status === this.state.status_pemesanan) {
                      let selected = true;
                      return (
                        <option value={item.status} selected={selected}>
                          {item.status}
                        </option>
                      );
                    } else {
                      let selected = false;
                      return (
                        <option value={item.status} selected={selected}>
                          {item.status}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
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
