const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, MongoUrl } = require("./config.js");
const { todoModel } = require("./model/model.js");
const cors = require("cors");
app.use(express.json());
app.use(cors());
//////CREATE TODO
app.post("/todo", async (req, res) => {
  try {
    const NewTodo = {
      title: req.body.title,
    };

    const todo = await todoModel.create(NewTodo);
    return res.send(todo);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});
//////GET ALL TODO
app.get("/todo", async (req, res) => {
  try {
    const todo = await todoModel.find({});
    return res.send(todo);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

//GET TODO BY ID

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id);
    res.send(todo);
  } catch (e) {
    res.send(e.message);
  }
});

//Update Todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const UpdateTodo = await todoModel.findByIdAndUpdate(id, req.body);
    if (!UpdateTodo) {
      res.send("BOOK NOT FOUND");
    } else {
      res.send("BOOK UPDATED SUCCESSFULLY");
    }
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

//Delete Todo

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodo = await todoModel.findByIdAndDelete(id);
    if (!delTodo) {
      res.send("BOOK NOT DELETED");
    } else {
      res.send("BOOK DELETED SUCCESSFULLY");
    }
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});
mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("Database connected ");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
