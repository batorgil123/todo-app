import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("No tasks yet. Add one above!");
  const [filterState, setFilterState] = useState("ALL");
  const [logs, setLogs] = useState([]); 
  const [showLogs, setShowLogs] = useState(false); 

  const Handleinput = (event) => {
    setInputValue(event.target.value);
  };

  const HandleAdd = () => {
    if (inputValue.length === 0) {
      setError("No tasks yet. Add one above!");
      return;
    }
    setError("");
    const newTask = { text: inputValue, id: uuidv4(), status: "ACTIVE" };
    setTodo([...todo, newTask]);
    logActivity(newTask.id, "Added");
    setInputValue("");
  };

  const HandleCheckbox = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "ACTIVE" ? "COMPLETED" : "ACTIVE" }
          : task
      )
    );
    logActivity(id, "Marked as Completed");
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
    logActivity(id, "Deleted");
  };

  const handleFilterState = (state) => {
    setFilterState(state);
  };

  const logActivity = (id, action) => {
    const time = new Date().toLocaleString();
    setLogs((prevLogs) => [...prevLogs, `${time} - Task ${id} ${action}`]);
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs); 
  };

  const filteredTodos = todo.filter((item) => {
    if (filterState === "ACTIVE") return item.status === "ACTIVE";
    if (filterState === "COMPLETED") return item.status === "COMPLETED";
    return true;
  });

  return (
    <div className="App">
      <div className="input-container">
        <p className="title">To-Do List</p>
        <input
          className="input-1"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={Handleinput}
        />
        <button className="add-button" onClick={HandleAdd}>
          Add
        </button>
      </div>

      <div className="buttons-container">
        <button onClick={() => handleFilterState("ALL")} className="button-ALL">
          All
        </button>
        <button onClick={() => handleFilterState("ACTIVE")} className="button-ACTIVE">
          Active
        </button>
        <button onClick={() => handleFilterState("COMPLETED")} className="button-Completed">
          Completed
        </button>
        <button onClick={toggleLogs} className="activity-log-button">
          {showLogs ? "Hide Logs" : "Show Logs"}
        </button>
      </div>

      {error.length > 1 && <div className="error">{error}</div>}

      {filteredTodos.map((todo) => (
        <div key={todo.id} className="list">
          <div className="list-item">
            <input
              className="checkboxes"
              type="checkbox"
              checked={todo.status === "COMPLETED"}
              onChange={() => HandleCheckbox(todo.id)}
            />
            <div className="list-text">{todo.text}</div>
          </div>
          <button onClick={() => handleDelete(todo.id)} className="Delete">
            Delete
          </button>
        </div>
      ))}
      {showLogs && (
        <div className="log-section">
          <ul>
            {logs.length === 0 ? <p>No actions yet.</p> : logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="bottom-title">Powered by Pinecone Academy</p>
    </div>
  );
}

export default App;
