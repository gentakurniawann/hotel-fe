import React from "react";
import SidebarAdmin from "./sidebarAdmin";
import SidebarReceptionist from "./sidebarRecetionist";
import axios from "axios";

export default class SidebarMain extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      role: "",
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
  getRoleUser = () => {
    let role = localStorage.getItem("role");
    let url = "http://localhost:2604/user";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          role: role,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.role);
  };

  componentDidMount = () => {
    this.getRoleUser();
  };
  render() {
    if (this.state.role === "admin") {
      return (
        <div>
          <SidebarAdmin {...this.props} />;
        </div>
      );
    } else if (this.state.role === "resepsionis") {
      return (
        <div>
          <SidebarReceptionist {...this.props} />;
        </div>
      );
    }
  }
}
