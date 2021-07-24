import React from "react";

const users = "http://localhost:3001/users";

export default class LoginForm extends React.Component {
  state = {
    login: "",
    password: "",
    error: false,
    user: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleLoginClick } = this.props;
    fetch(users + "/" + this.state.login + "/" + this.state.password)
      .then((response) => response.json())
      .then((json) => {
        if (json[0] === undefined) {
          this.setState({ error: true });
        } else {
          handleLoginClick(true, json[0]);
        }
      });
  };

  handleChangeLogin = (e) => {
    this.setState({ login: e.target.value });
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    let { login } = this.state;
    let { password } = this.state;
    let { error } = this.state;

    return (
      <div>
        <p>
          <label> Логин </label>
          <input value={login} onChange={this.handleChangeLogin} />
        </p>
        <p>
          <label> Пароль </label>
          <input
            type="password"
            value={password}
            onChange={this.handleChangePassword}
          />
        </p>
        <button onClick={this.handleSubmit}>Войти</button>
        {error ? <p> Неверный логин или пароль</p> : ""}
      </div>
    );
  }
}
