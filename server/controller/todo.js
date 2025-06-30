// controllers/todo.js
const Todo = require("../models/todo");


// exports.getAllTodo = async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     if (!userId) return res.status(400).json({ message: "User ID required" });

//     const todos = await Todo.find({
//       $or: [
//         { userId },
//         { sharedWith: userId } // or email, depending on implementation
//       ]
//     });

//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch todos", error: err.message });
//   }
// };
exports.getAllTodo = async (req, res) => {
  try {
    const { userId, email } = req.query;
    if (!userId && !email) return res.status(400).json({ message: "User ID or Email required" });

    const todos = await Todo.find({
      $or: [
        { userId },
        { sharedWith: email }
      ]
    });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos", error: err.message });
  }
};


exports.postCreateTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => res.json({ message: "Todo added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add todo", error: err.message })
        );
};

exports.putUpdateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update todo", error: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "todo deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "book not found", error: err.message })
        );
};
exports.shareTodo = async (req, res) => {
  try {
    const { email } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo.sharedWith.includes(email)) {
      todo.sharedWith.push(email);
      await todo.save();
    }

    res.json({ message: "Todo shared successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Error sharing todo", error: err.message });
  }
};
