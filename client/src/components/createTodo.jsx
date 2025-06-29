import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      setMessage("User not logged in. Please sign in first.");
      return;
    }

    axios
  .post(`${import.meta.env.VITE_API_URL}/api/todo`, { ...data, userId }, {
    headers: {
      "x-user-id": userId
    }
  })
      .then((res) => {
        setData({
          title: "",
          description: "",
          priority: "Medium",
          status: "Pending",
        });
        setMessage("Todo created successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.log("Error: couldn't create TODO", err.message);
        setMessage("Failed to create Todo.");
      });
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <h2 className="fw-bold mb-0">Create New Task</h2>
            <Link to="/" className="btn btn-outline-secondary">
              &larr; Back
            </Link>
          </div>

          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="title"
                className="form-control"
                id="floatingTitle"
                placeholder="Task Title"
                value={data.title}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingTitle">
                Title <span className="text-danger">*</span>
              </label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                name="description"
                className="form-control"
                id="floatingDesc"
                placeholder="Task Description"
                style={{ height: "100px" }}
                value={data.description}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingDesc">
                Description <span className="text-danger">*</span>
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="priority" className="form-label fw-semibold">
                Priority <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="priority"
                value={data.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="form-label fw-semibold">
                Status <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="status"
                value={data.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Create Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
