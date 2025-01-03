import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const Handleinput = (event) => {
    setInputValue(event.target.value);
  };
  const HandleAdd = () => {
    if (inputValue.length === 0) {
      setError("Please Enter Todo Task");
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

  return (
    <div className="App">
      <p className="title">To-Do list</p>
      <input 
        className="input-1"
        placeholder="Add To Do"
        value={inputValue}
        onChange={Handleinput}
      />
      <button className="add-button" onClick={HandleAdd}>
        Add
      </button>
      <div className="buttons-container">
        <button className="buttons">All</button>
        <button className="buttons">Active</button>
        <button className="buttons">Completed</button>
      </div>

      {error.length > 1 && <div>{error}</div>}
      
      {todo.map((todo) => {
        return (
          <div className="list">
            <input
              className="checkboxes"
              type="checkbox"
              onChange={HandleCheckbox(todo.id)}
            />
            {todo.text}
          </div>
        );
      })}
    </div>
  );
}

export default App;
