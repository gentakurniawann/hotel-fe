import React from "react";
import axios from "axios";
import Media from "../../component/media/media";
import "./styles.css";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      nama_user: "",
      email: "",
      password: "",
      role: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <section className="register">
        <div className="container-register">
          <div className="row align-items-center">
            <div className="col-6 col-image">
              <div className="image-register">
                <Media value image="login-img.png"></Media>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 content">
              <div className="logo">
                <h1>N</h1>
              </div>
              <div className="register-form">
                <h1>Register</h1>
                <div className="form-input">
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
                    />
                  </div>
                  <div className="email">
                    <label for="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
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
                      type="text"
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="*******"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                  <div className="Role">
                    <label for="username" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select form-select-lg"
                      aria-label="role"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="form-button">
                  <button className="btn btn-register">Register</button>
                  <p>
                    Already have an account?
                    <a href=""> Login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
