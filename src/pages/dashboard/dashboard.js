import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import Media from "../../component/media/media";
import { Link } from "react-router-dom";
import "./styles.css";
export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      userName: "",
      roleUser: "",
      userCount: 0,
      customerCount: 0,
      roomCount: 0,
      pemesananCount: 0,
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

  getUser = () => {
    let url = "http://localhost:2604/user";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          userCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getUserLogin = () => {
    let id_user = localStorage.getItem("id_user");
    let role = localStorage.getItem("role");
    let url = "http://localhost:2604/user/" + id_user;
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          userName: res.data.user.nama_user,
          roleUser: role,
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
          customerCount: res.data.count,
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
          roomCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getPemesanan = () => {
    let url = "http://localhost:2604/pemesanan";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          pemesananCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  componentDidMount = () => {
    this.getUser();
    this.getCustomer();
    this.getRoom();
    this.getPemesanan();
    this.getUserLogin();
  };
  render() {
    if (this.state.roleUser === "admin") {
      return (
        <div className="dashboard">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Dashboard</h1>
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
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-receptionist.svg"
                      alt="icon-receptionist.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.userCount}</h2>
                    <p>Users</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-customer.svg"
                      alt="icon-customer.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.customerCount}</h2>
                    <p>Customers</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-room.svg"
                      alt="icon-room.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.roomCount}</h2>
                    <p>Rooms</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-transaction.svg"
                      alt="icon-transaction.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.pemesananCount}</h2>
                    <p>Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.roleUser === "resepsionis") {
      return (
        <div className="dashboard">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Dashboard</h1>
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
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-customer.svg"
                      alt="icon-customer.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.customerCount}</h2>
                    <p>Customers</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-transaction.svg"
                      alt="icon-transaction.svg"
                      width="40px"
                      height="40px"
                    ></Media>
                  </div>
                  <div className="text">
                    <h2>{this.state.pemesananCount}</h2>
                    <p>Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
