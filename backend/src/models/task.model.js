const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "completed", "overdue"],
      default: "todo",
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timeStamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
