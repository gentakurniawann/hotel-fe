import React from "react";
import axios from "axios";
import SidebarMain from "../../component/sidebar/sidebarMain";
import Media from "../../component/media/media";
import "./styles.css";
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      email: "",
      foto: null,
      fotopreview: "",
      password: "",
      token: "",
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

  handleSave = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("nama_user", this.state.nama_user);
    form.append("email", this.state.email);
    form.append("foto", this.state.foto);
    form.append("password", this.state.password);

    let url = "http://localhost:2604/user/" + this.state.id_user;
    axios
      .put(url, form, this.headerConfig())
      .then((res) => {
        this.getUser();
        window.history.back();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getUser = () => {
    let id_user = localStorage.getItem("id_user");
    let url = "http://localhost:2604/user/" + id_user;
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          id_user: localStorage.getItem("id_user"),
          nama_user: res.data.user.nama_user,
          foto: null,
          fotopreview: "http://localhost:2604/image/user/" + res.data.user.foto,
          email: res.data.user.email,
          password: "",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidMount = () => {
    this.getUser();
  };
  render() {
    return (
      <div className="profile">
        <SidebarMain />
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="profile-card col-md-10 col-sm-12">
              <h1 className="text-center">Profile</h1>
              <div className="d-flex align-items-center">
                <div className="image">
                  <img
                    src={this.state.fotopreview}
                    alt={this.state.fotopreview}
                    width="240px"
                    height="240px"
                  />
                </div>
                <form
                  className="form-profile"
                  onSubmit={(e) => this.handleSave(e)}
                >
                  <div className="name">
                    <label for="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="nama_user"
                      placeholder="your name"
                      onChange={this.handleChange}
                      value={this.state.nama_user}
                      required
                    />
                  </div>
                  <div className="foto">
                    <label for="foto" className="form-label">
                      Photo Profile
                    </label>
                    <input
                      type="file"
                      name="foto"
                      className="form-control form-control-lg"
                      onChange={this.handleFile}
                      value={this.state.Foto}
                      style={{ lineHeight: "32px" }}
                    />
                  </div>
                  <div className="email">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="example@gmail.com"
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                  </div>
                  <div className="password">
                    <label for="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="*******"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                  <button className="btn btn-saveProfile" type="submit">
                    Save Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
