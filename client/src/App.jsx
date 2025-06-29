import React from 'react'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import { Login } from "./components/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsedUser = JSON.parse(saved);
        if (parsedUser && parsedUser._id) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogin = (userData) => {
    if (userData && userData._id) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      console.warn("Invalid userData passed to handleLogin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you set it
    setUser(null);
  };

  return (
    <div className="app-contents">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route
                path="/"
                element={<ShowTodoList user={user} onLogout={handleLogout} />}
              />
              <Route
                path="/create-todo"
                element={<CreateTodo user={user} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
