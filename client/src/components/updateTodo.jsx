import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/todo/${_id}`)
      .then((res) => {
        const { title, description, priority, status } = res.data;
        setData({ title, description, priority, status });
      })
      .catch((err) => {
        console.log("Failed to fetch todo data");
        console.log(err.message);
      });
  }, [_id]);

  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/todo/${_id}`, data)
      .then(() => {
        handleUpdate();
        handleClose();
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="label">Title</label>
      <input
        type="text"
        name="title"
        className="input"
        value={data.title}
        onChange={handleChange}
      />

      <label className="label">Description</label>
      <input
        type="text"
        name="description"
        className="input"
        value={data.description}
        onChange={handleChange}
      />

      <label className="label">Priority</label>
      <select
        name="priority"
        className="input"
        value={data.priority}
        onChange={handleChange}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <label className="label">Status</label>
      <select
        name="status"
        className="input"
        value={data.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" className="button mt-3">
        Submit
      </button>
    </form>
  );
}
