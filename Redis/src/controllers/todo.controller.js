const express = require("express");
const client = require("../configs/redis");

const Todo = require("../models/product.model")

const router = express.Router();

// <-------------------rebis get post--------------------->
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    const todos = await Todo.find().lean().exec();

    client.set("todos", JSON.stringify(todos));

    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// router.get("", async (req, res) => {
//   try {
//     client.get("todos", async function (err, fetchedTodos) {
//       if (fetchedTodos) {
//         const todos = JSON.parse(fetchedTodos);

//         return res.status(200).send({ todos, redis: true });
//       } else {
//         try {
//           const todos = await Todo.find().lean().exec();

//           client.set("todos", JSON.stringify(todos));

//           return res.status(200).send({ todos, redis: false });
//         } catch (err) {
//           return res.status(500).send({ message: err.message });
//         }
//       }
//     });
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

module.exports = router

