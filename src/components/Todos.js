import React from "react";

//const todosList = "https://jsonplaceholder.typicode.com/todos";
const todosList = "http://localhost:3001/todos";

export default class Todos extends React.Component {
  state = {
    todos: [],
    userInfo: 0,
    dataIsReturned: false,
  };

  componentWillMount = async () => {
    const user = this.props;
    this.setState({ userInfo: user["user"] });
  };

  componentDidMount = async () => {
    const result = await fetch(
      todosList + "?userId=" + this.state.userInfo["id"]
    );
    this.setState({ todos: await result.json(), dataIsReturned: true });
  };

  handleExit = (e) => {
    e.preventDefault();
    this.props.handleLoginClick(false, -1);
  };

  render() {
    return (
      <>
        {this.state.dataIsReturned ? (
          <div>
            <h1> TODO {this.state.userInfo["name"]} </h1>
            <ul>
              {this.state.todos.map((item) => (
                <li>
                  <a class={item.completed ? "cmpld" : ""}> {item.title} </a>
                </li>
              ))}
            </ul>
            <button onClick={this.handleExit}> Выйти </button>
          </div>
        ) : (
          <h1>Загрузка</h1>
        )}
      </>
    );
  }
}
