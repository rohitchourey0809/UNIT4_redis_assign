const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    whenToComplete: { type: Date, required: true },
    isCompleted: { type: Boolean, required: false, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", todoSchema);

 module.exports = Todo;