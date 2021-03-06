import React, { useReducer, useRef } from "react";
import AppHeader from "./components/AppHeader";
import MeContainer from "./components/MeContainer";
import UserName from "./components/UserName";
import OutputContainer from "./components/OutputContainer";
import Intro from "./components/Intro";

const clearCommand = () => ({ history: [], outputs: [] });
const historyCommand = ({ newHistory, newOutputs }) => ({
  history: newHistory,
  outputs: [...newOutputs, <div>{mapArray(newHistory, true)}</div>],
});
const lsCommand = ({ newHistory, newOutputs }) => ({
  history: newHistory,
  outputs: [
    ...newOutputs,
    <div>{Array.from(commandsMap.keys()).join(", ")}</div>,
  ],
});
const meCommand = ({ newHistory, newOutputs }) => ({
  history: newHistory,
  outputs: [...newOutputs, <MeContainer />],
});
const contactCommand = ({ newHistory, newOutputs }) => ({
  history: newHistory,
  outputs: [
    ...newOutputs,
    <a href="mailto:sevrain.chea@gmail.com">sevrain.chea@gmail.com</a>,
  ],
});
const socialCommand = ({ newHistory, newOutputs }) => ({
  history: newHistory,
  outputs: [
    ...newOutputs,
    <a
      href="https://www.linkedin.com/in/sevrainchea/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Linkedin
    </a>,
    <a
      href="https://github.com/SevrainChea"
      target="_blank"
      rel="noopener noreferrer"
    >
      Github
    </a>,
    <a
      href="https://sevrain-chea.medium.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Medium
    </a>,
  ],
});
const unknownCommand = ({ newHistory, newOutputs, command }) => ({
  history: newHistory,
  outputs: [...newOutputs, <span>{command} : Unknown command</span>],
});

const commandsMap = new Map([
  ["clear", clearCommand],
  ["history", historyCommand],
  ["ls", lsCommand],
  ["me", meCommand],
  ["contact", contactCommand],
  ["social", socialCommand],
]);

const reducer = (state, action) => {
  const { command, input } = action;
  const { history, outputs } = state;

  if (input || !command) {
    return {
      userInput: input,
      history: history,
      outputs: outputs,
    };
  }

  const newOutputs = [...outputs, <OutputContainer command={command} />];
  const newHistory = [...history, command];

  const args = { newOutputs, newHistory, command };

  const commandFunction = commandsMap.get(command) || unknownCommand;

  return { userInput: "", ...commandFunction(args) };
};

const mapArray = (array, showIndex = false) =>
  array.map((item, index) => (
    <div key={index}>
      {showIndex && index + 1} {item}
    </div>
  ));

const App = () => {
  const initialState = {
    userInput: "",
    outputs: [],
    history: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUserInputChange = (e) => {
    dispatch({ input: e.target.value });
  };

  const handleOnKeyUp = (e) => {
    const command = e.target.value;

    if (e.keyCode === 13 && command) {
      dispatch({ command: command });
    }
  };

  const commandInput = useRef();

  const focusCommandInput = () => commandInput.current.focus();

  const outputsMap = mapArray(state.outputs);

  return (
    <div className="App">
      <AppHeader />
      <div className="container">
        <Intro />
        {outputsMap}
        <div className="input-container">
          <UserName />
          <input
            autoFocus={true}
            ref={commandInput}
            onBlur={focusCommandInput}
            autoComplete="off"
            name="userInput"
            value={state.userInput}
            onKeyUp={handleOnKeyUp}
            onChange={handleUserInputChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default App;
