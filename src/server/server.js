var express = require("express");
var cors = require("cors");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(cors());

const jsonParser = express.json();

app.get("/users/:username/:website", function (request, response) {
  let username = request.params["username"];
  let website = request.params["website"];
  var fileName = path.resolve(__dirname, "./data/users.json");
  let data = fs.readFileSync(fileName, "utf-8");

  let users = JSON.parse(data);
  let user = users.filter(
    (element) => element.username == username && element.website == website
  );

  response.send(user);
});

app.get("/todos/:userId", function (request, response) {
  let userId = request.params["userId"];
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf-8");

  let todos = JSON.parse(data);
  let filteredTodos = todos.filter((element) => element.userId == userId);

  response.send(filteredTodos);
});

app.get("/todos", function (request, response) {
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf-8");

  let todos = JSON.parse(data);
  let maxTodoId = todos[todos.length - 1];

  response.send(maxTodoId);
});

app.post("/todos", jsonParser, function (request, response) {
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf-8");
  let todos = JSON.parse(data);

  let newTodo = request.body;
  todos.push(newTodo);

  fs.writeFileSync(fileName, JSON.stringify(todos));

  response.send(todos);
});

app.delete("/todos", jsonParser, function (request, response) {
  var fileName = path.resolve(__dirname, "./data/todos.json");
  let data = fs.readFileSync(fileName, "utf-8");
  let todos = JSON.parse(data);

  let delTodo = request.body;
  console.log(todos.splice(delTodo.id - 1, 1));

  fs.writeFileSync(fileName, JSON.stringify(todos));

  response.send(todos);
});

app.listen(3001);
