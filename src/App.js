import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("No tasks yet. Add one above!");
  const [filterState, setFilterState] = useState("ALL");
  let a = [];
  const Handleinput = (event) => {
    setInputValue(event.target.value);
  };

  const HandleAdd = () => {
    if (inputValue.length === 0) {
      setError("No tasks yet. Add one above!");
      return;
    } else {
      setError("");
      setTodo([...todo, { text: inputValue, id: uuidv4(), status: "ACTIVE" }]);
      setInputValue("");
    }
  };

  const HandleCheckbox = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((i) => (i.id === id ? { ...i, status: "COMPLETED" } : i))
    );
  };

  const handleDelete = (id) => {
    const newTodos = todo.filter((item) => item.id !== id);
    setTodo(newTodos);
  };

  const handlefilterstate = (state) => {
    setFilterState(state);
  };

  const logActivity = (id,status) => {
    const time = new Date().toLocaleString();
    console.log(id,status, time);
  };

  const filteredTodos = todo.filter((item) => {
    if (filterState === "ACTIVE") return item.status === "ACTIVE";
    if (filterState === "COMPLETED") return item.status === "COMPLETED";
    return true;
  });

  return (
    <div className="App">
      <div className="input-container">
        <p className="title">To-Do list</p>
        <input
          className="input-1"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={Handleinput}
        />
        <button className="add-button" onClick={event=>{HandleAdd();logActivity(inputValue,"Added");}}>
          Add
        </button>
      </div>

      <div className="buttons-container">
        <button onClick={()=>handlefilterstate("ALL")} className="button-ALL">
          All
        </button>
        <button onClick={()=>handlefilterstate("ACTIVE")} className="button-ACTIVE">
          Active
        </button>
        <button
          onClick={()=>handlefilterstate("COMPLETED")}
          className="button-Completed"
        >
          Completed
        </button>
        <button className="activity-log-button">Log</button>
      </div>

      {error.length > 1 && <div className="error">{error}</div>}

      {filteredTodos.map((todo) => {
        return (
          <div key={todo.id} className="list">
            <div className="list-item">
              <input
                className="checkboxes"
                type="checkbox"
                onChange={(event) => {
                  HandleCheckbox(todo.id);
                  logActivity(todo.id,"Status Changed into:");
                }}
              />
              <div className="list-text">{todo.text}</div>
            </div>
            <button
              onClick={(event) => {
                handleDelete(todo.id);
                logActivity(todo.id,"Deleted");
              }}
              className="Delete"
            >
              Delete
            </button>
          </div>
        );
      })}
      <p className="bottom-title">Powered by Pinecone academy</p>
    </div>
  );
}

export default App;
