import React from "react";
import Modal from "./Modal";

const todosList = "http://localhost:3001/todos";

export default class Todos extends React.Component {
  state = {
    todos: [],
    userInfo: 0,
    dataIsReturned: false,
    newTodo: "",
    modalAdd: false,
    modalDelete: false,
    delElem: "",
    maxTodo: [],
  };

  componentWillMount = async () => {
    const user = this.props;
    this.setState({ userInfo: user["user"] });
  };

  componentDidMount = async () => {
    const result = await fetch(todosList + "/" + this.state.userInfo["id"]);
    const maxTodoResult = await fetch(todosList);
    this.setState({
      todos: await result.json(),
      dataIsReturned: true,
      maxTodo: await maxTodoResult.json(),
    });
  };

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTodo.length === 0) {
      return;
    }

    const srvTodo = {
      userId: this.state.userInfo["id"],
      id: this.state.maxTodo.id + 1,
      title: this.state.newTodo,
      completed: false,
    };
    fetch(todosList, {
      method: "POST",
      body: JSON.stringify(srvTodo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        const newLocalTODO = {
          userId: this.state.userInfo["id"],
          id: this.state.maxTodo.id,
          title: this.state.newTodo,
          completed: false,
        };
        this.setState((state) => ({
          todos: state.todos.concat(newLocalTODO),
          newTodo: "",
        }));
      });
    this.setState({ modalAdd: false, maxTodo: srvTodo });
  };

  handleExit = (e) => {
    e.preventDefault();
    this.props.handleLoginClick(false, -1);
  };

  handleAddTodo = (e) => {
    this.setState({ modalAdd: true, newTodo: "" });
  };

  handleCloseAddForm = (e) => {
    this.setState({ modalAdd: false });
  };

  handleRemoveTodo = (e) => {
    e.preventDefault();
    let delElem = e.target.parentNode;
    this.setState({ showDel: true, delElem: delElem });
    this.setState({ modalDelete: true });
  };

  handleCloseDeleteForm = (e) => {
    this.setState({ modalDelete: false });
  };

  handleDelete = (e) => {
    e.preventDefault();
    let todos = this.state.todos;
    let idDel = this.state.delElem.children[0].id;
    let ind = todos.findIndex((x) => x.id === idDel);
    fetch(todosList, {
      method: "DELETE",
      body: JSON.stringify({ id: idDel }),
      headers: { "Content-Type": "application/json" },
    });
    todos.splice(ind, 1);
    this.setState({ todos: todos, showDel: false, delElem: "" });
    this.setState({ modalDelete: false });
  };

  render() {
    return (
      <>
        <Modal
          isOpened={this.state.modalAdd}
          onModalClose={this.handleCloseAddForm}
        >
          <div className="form">
            <label> New TODO </label>
            <input value={this.state.newTodo} onChange={this.handleChange} />
            <div>
              <button onClick={this.handleSubmit}>Принять</button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpened={this.state.modalDelete}
          onModalClose={this.handleCloseDeleteForm}
        >
          <div className="form">
            <label> Вы уверены? </label>
            <div>
              <button onClick={this.handleDelete}>ОК</button>
              <button onClick={this.handleCloseDeleteForm}>Отмена</button>
            </div>
          </div>
        </Modal>

        {this.state.dataIsReturned ? (
          <div>
            <h1> TODO {this.state.userInfo["name"]} </h1>
            <button onClick={this.handleAddTodo}>Добавить</button>
            <ul>
              {this.state.todos.map((item) => (
                <li>
                  <a id={item.id} class={item.completed ? "cmpld" : ""}>
                    {item.title}
                  </a>
                  <button onClick={this.handleRemoveTodo}>x</button>
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
