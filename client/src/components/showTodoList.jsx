import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description, priority, status } = data;
    function handleShare(todoId) {
  const email = prompt("Enter the email/username to share with:");
  if (!email) return;

  axios.put(`${import.meta.env.VITE_API_URL}/api/todo/share/${todoId}`, { email })
    .then(() => alert("Shared successfully!"))
    .catch((err) => alert("Failed to share: " + err.message));
}

    return (
        <div className="card mb-4 shadow-sm border-top border-end border-bottom border-4"
            style={{ borderColor: priority === "High" ? "#dc3545" : priority === "Medium" ? "#ffc107" : "#0d6efd" }}>
            <div className="card-body position-relative">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 className="card-title fw-semibold text-dark">{title}</h5>
                        <p className="card-text text-muted mb-2">{description}</p>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                            <span className={`badge px-2 py-1 ${priority === "High" ? "bg-danger" : priority === "Medium" ? "bg-warning text-dark" : "bg-primary"}`}>
                                {priority} Priority
                            </span>
                            <span className="badge bg-secondary px-2 py-1">{status}</span>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="btn btn-sm btn-light border-0 text-secondary"
                            data-bs-toggle="dropdown">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className="dropdown-item" onClick={() => handleShare(data._id)}>
                                    Share
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-circle" name={_id} onClick={handleEdit}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm rounded-circle" name={_id} onClick={handleDelete}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ShowTodoList({ user, onLogout }) {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        if (!user?._id) return;
        axios.get(`${import.meta.env.VITE_API_URL}/api/todo?userId=${user._id}`)
            .then((res) => setTodo(res.data))
            .catch((err) => console.log(err.message));
    }, [update]);

    function handleUpdate() {
        setUpdate(!update);
    }

    function handleEdit(e) {
        setId(e.currentTarget.name);
        setOpen(true);
    }

    function handleDelete(e) {
        const taskId = e.currentTarget.name;
        axios.delete(`${import.meta.env.VITE_API_URL}/api/todo/${taskId}`).then(() => {
            setTodo((data) => data.filter((todo) => todo._id !== taskId));
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLogout();
    }

    const filtered = todo.filter((t) => {
        if (filter === "All") return true;
        return t.status === filter || t.priority === filter;
    });

    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-semibold">Dashboard - <span className="text-danger">({user.name})</span></h4>
                <div className="d-flex align-items-center gap-3">
                    <Link to="/create-todo">
                        <button className="btn btn-primary">+ New Task</button>
                    </Link>
                    <div className="dropdown">
                        <button className="btn border rounded-circle" data-bs-toggle="dropdown">
                            <i className="bi bi-person-circle fs-5"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li className="dropdown-item-text fw-bold">{user?.name || "Guest User"}</li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mb-4 p-4 rounded" style={{ backgroundColor: "#f0f0f7" }}>
                {[
                    { label: "Total Tasks", icon: "bi-list-task", count: todo.length },
                    {
                        label: "Completed",
                        icon: "bi-check-circle",
                        count: todo.filter((t) => t.status === "Completed").length,
                    },
                    {
                        label: "In Progress",
                        icon: "bi-clock",
                        count: todo.filter((t) => t.status === "In Progress").length,
                    },
                    {
                        label: "Pending",
                        icon: "bi-hourglass-split",
                        count: todo.filter((t) => t.status === "Pending").length,
                    },
                ].map((item, i) => (
                    <div key={i} className="col-6 col-md-3 py-2">
                        <div
                            className="p-3 rounded text-white d-flex justify-content-between align-items-center"
                            style={{
                                background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
                            }}
                        >
                            <div>
                                <div className="fw-bold">{item.label}</div>
                                <div>{item.count}</div>
                            </div>
                            <i className={`bi ${item.icon} fs-3 opacity-50`}></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="d-flex gap-2 mb-4 flex-wrap">
                {["All", "Pending", "In Progress", "Completed", "High", "Medium", "Low"].map((f) => (
                    <button key={f} className={`btn rounded-pill ${filter === f ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setFilter(f)}>
                        {f === "High" || f === "Medium" || f === "Low" ? `${f} Priority` : f}
                    </button>
                ))}
            </div>

            <div className="row">
                {paginated.length === 0 ? (
                    <div className="text-center text-muted">
                        {filter === "All" ? (
                            <><p>No tasks found. Create your first task to get started!</p><Link to="/create-todo" className="btn btn-outline-primary">
                                Create Task
                            </Link></>
                        ) : filter === "Pending" || filter === "In Progress" || filter === "Completed" || filter === "High" || filter === "Medium" || filter === "Low" ?
                            <p>No tasks found for selected filter.</p>
                            : null}
                        {/* if (todo.length === 0) {
                <p>No tasks found. Create your first task to get started!</p>
                         <Link to="/create-todo" className="btn btn-outline-primary">
                             Create Task
                         </Link>
            }else{
                <p>No tasks found for selected filter.</p>

            } */}

                    </div>
                ) : (
                    paginated.map((data) => (
                        <div className="col-md-6 col-lg-4" key={data._id}>
                            <TodoCard data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                                <li key={pg} className={`page-item ${page === pg ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setPage(pg)}>{pg}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {/* Update Modal */}
            {open && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <div className="d-flex justify-content-between">
                                <h5 className="modal-title">Update Task</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <UpdateTodo _id={id} handleClose={handleClose} handleUpdate={handleUpdate} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
