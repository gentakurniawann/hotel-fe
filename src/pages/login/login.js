import React from "react";
import axios from "axios";
import Media from "../../component/media/media";
import "./styles.css";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    let url = "http://localhost:2604/user/auth";
    axios.post(url, data).then((res) => {
      if (res.data.logged) {
        let nama_user = res.data.data.nama_user;
        let id_user = res.data.data.id_user;
        let email = res.data.data.email;
        let foto = res.data.data.foto;
        let user = res.data.data;
        let role = res.data.data.role;
        let token = res.data.token;
        localStorage.setItem("nama_user", nama_user);
        localStorage.setItem("id_user", id_user);
        localStorage.setItem("email", email);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("foto", foto);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        let role_user = localStorage.getItem("role");
        if (role_user === "admin") {
          window.location = "/";
        } else if (role_user === "resepsionis") {
          window.location = "/";
        } else {
          window.alert(res.data.message);
        }
      } else {
        window.alert(res.data.message);
      }
    });
  };
  render() {
    return (
      <section className="login">
        <div className="container-login">
          <div className="row align-items-center">
            <div className="col-6 col-image">
              <div className="image-login">
                <Media value image="login-img.png" width=""></Media>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 content">
              <div className="logo">
                <h1>N</h1>
              </div>
              <form
                className="login-form"
                onSubmit={(e) => this.handleLogin(e)}
              >
                <h1>Login</h1>
                <div className="form-input">
                  <div className="email">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="example@gmail.com"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div>
                  <div className="password">
                    <label for="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="*******"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className="form-button">
                  <button className="btn btn-login">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
