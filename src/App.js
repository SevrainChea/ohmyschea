import React, { useState } from "react";
import Input from "./Input";
import "./App.css";

const App = () => {
  // TODO : type input
  const [inputs, setInputs] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  const addInput = (input) => {
    setInputs([...inputs, <Input />]);
  };

  const test = () => {
    console.log("coucou");
    setInputs([...inputs, <Input />]);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleOnKeyUp = (e) => {
    if(e.keyCode === 13) {
      console.log(e.target.value)
      setInputs([...inputs, <Input />]);
    }
  }

  const previousInputs = inputs.map((input, index) => (
    <div key={index}>Hello {index}</div>
  ));

  return (
    <div className="App">
      <div className="App-header">
        <div className="button-bar">
          <span className="but red"></span>
          <span className="but yellow"></span>
          <span className="but green"></span>
        </div>
        <span className="term-name">Header Title</span>
      </div>
      <div className="container">
      {previousInputs}
        <input
          name="userInput"
          value={userInput}
          onKeyUp={handleOnKeyUp}
          onChange={handleUserInputChange}
          onSubmit={test}
        ></input>
        <button onClick={test}>Add</button>
      </div>
    </div>
  );
};

export default App;
