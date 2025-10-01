import express from "express"
import dotenv from "dotenv"
import crypto from "crypto"

const app = express()

dotenv.config({
  path: "./.env"
});

app.use(express.urlencoded())

app.set("view engine", "ejs")

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server start by on ${PORT}`)
});

// Todo-list Array
let todoLists = []

app.get("/", (req, res) => {
  return res.render("index", { todoLists: todoLists })
})

app.get("/todo", (req, res) => {
  return res.render("todo")
})

// Task Post Required
app.post("/todoForm", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let date = req.body.date;
  let task_level = req.body.task_level

  let todoList = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    date: date,
    task_level: task_level
  };

  todoLists.push(todoList)
  console.log(todoLists);
  console.log(" 🟢 TodoList are successfully added..!!");

  return res.redirect("/")
})

// Delete TodoList
app.get("/deleteTodo/:id", (req, res) => {
  const id = req.params.id;
  todoLists = todoLists.filter(todo => todo.id !== id);
  console.log(` 🔴 Deleted TodoList..!! `);
  console.log(todoLists)
  return res.redirect("/");
})

// Edit TodoList

app.get("/editTodo/:id", (req, res) => {
  const todoEdit = req.params.id;
  console.log("TodoEditId", todoEdit);

  const EditId = todoLists.find((t) => t.id === todoEdit);
  if (!EditId) {
    return res.status(404).send("Todo not Found");
  }
  console.log(" ✏️ ready to change ", EditId);
  return res.render("editTodo", { EditId });
});

app.post("/updateTodo/:id", (req, res) => {
  const TodoId = req.params.id;
  console.log("TodoList Id", TodoId);

  todoLists = todoLists.map((todo) => {
    if (todo.id === TodoId) {
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.date = req.body.date;
      todo.task_level = req.body.task_level;
    }
    return todo;
  });
  console.log(` 🔵 TodoList successFully Updated..!! `);
  console.log(todoLists);
  return res.redirect("/");
});

