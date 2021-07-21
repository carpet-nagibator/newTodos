import "./App.css";
import React from "react";
import LoginForm from "./components/LoginForm";
import Todos from "./components/Todos";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: [],
  };

  handleLoginClick = (param1, param2) => {
    this.setState({ isLoggedIn: param1, user: param2 });
  };

  render() {
    return (
      <div className="App-header">
        {this.state.isLoggedIn ? (
          <Todos
            handleLoginClick={this.handleLoginClick}
            user={this.state.user}
          />
        ) : (
          <div>
            <LoginForm handleLoginClick={this.handleLoginClick} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
