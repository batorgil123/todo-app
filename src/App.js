import "./App.css";
import React, { useState } from "react";
function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const Handleinput = (event) => {
    setInputValue(event.target.value);
  };
  const HandleAdd = () => {
    setTodo([...todo, inputValue]);
    console.log(todo);
  };
  return (
    <div className="App">
      <input onChange={Handleinput}></input>
      <button onClick={HandleAdd}>Add</button>
      {todo.map((todo) => {
        return <div>{todo}</div>;
      })}
    </div>
  );
}

export default App;
