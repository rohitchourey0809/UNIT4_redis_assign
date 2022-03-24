const express = require("express");
const client = require("../configs/redis");

const Todo = require("../models/product.model")

const router = express.Router();

// <-------------------rebis get post--------------------->
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    const todos = await Todo.find().lean().exec();
    console.log(todos)

    client.set("todos", JSON.stringify(todos));

    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    client.get("todos", async function (err, fetchedTodos) {
      if (fetchedTodos) {
        const todos = JSON.parse(fetchedTodos);

        return res.status(200).send({ todos, redis: true });
      } else {
        try {
          const todos = await Todo.find().lean().exec();

          client.set("todos", JSON.stringify(todos));

          return res.status(200).send({ todos, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// <------------------------------------/findbyid-------------->
router.get("/:id", async (req, res) => {
  try {
    client.get(`todos.${req.params.id}`, async function (err, fetchedTodos) {
      if (fetchedTodos) {
        const todos = JSON.parse(fetchedTodos);

        return res.status(200).send({ todos, redis: true });
      } else {
        try {
          const todos = await Todo.findById(req.params.id).lean().exec();

          client.set(`todos.${req.params.id}`, JSON.stringify(todos));

          return res.status(200).send({ todos, redis: false });
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// <--------------patches---------------------------->
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
      console.log(todo)

    const todos = await Todo.find().lean().exec();

    client.set(`todos.${req.params.id}`, JSON.stringify(todo));
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// <--------------------------delete---------------------------->
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();

    const todos = await Todo.find().lean().exec();

    client.del(`todos.${req.params.id}`);
    client.set("todos", JSON.stringify(todos));

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});






module.exports = router

