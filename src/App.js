import React, { useReducer, useRef } from "react";
import AppHeader from "./AppHeader";
import MeContainer from "./MeContainer";

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

  console.log(commandFunction);

  return { userInput: "", ...commandFunction(args) };
};

const mapArray = (array, showIndex = false) =>
  array.map((item, index) => (
    <div key={index}>
      {showIndex && index + 1} {item}
    </div>
  ));

const UserName = () => <span className="userName">→ ohmyschea ~ </span>;

const OutputContainer = ({ command }) => (
  <div className="input-container">
    <UserName /> <span>{command}</span>
  </div>
);

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
