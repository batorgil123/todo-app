import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("No tasks yet. Add one above!");
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
    todo.map((i) => {
      if (id == i.id) i.status = "Completed";
    });
  };
  const handleDelete = (id) => {
    const newTodos = todo.filter((todo) => todo.id !== id);
    setTodo(newTodos);
  };
  const handleAll = () => {
    
  }
  const handleActive = () => {
    
  }
  const handleCompleted = () => {
    
  }
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
        <button className="add-button" onClick={HandleAdd}>
          Add
        </button>
      </div>
      <div className="buttons-container">
        <button onClick={handleAll} className="button-ALL">All</button>
        <button onClick={handleActive} className="button-ACTIVE">Active</button>
        <button onClick={handleCompleted} className="button-Completed">Completed</button>
      </div>

      {error.length > 1 && <div className="error">{error}</div>}

      {todo.map((todo) => {
        return (
          <div className="list">
            <div className="list-item">
              <input
                className="checkboxes"
                type="checkbox"
                onChange={HandleCheckbox(todo.id)}
              />
              <div className="list-text">{todo.text}</div>
            </div>
            <button onClick={() => handleDelete(todo.id)} className="Delete">
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
