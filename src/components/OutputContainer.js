import UserName from "./UserName";

const OutputContainer = ({ command }) => (
  <div className="input-container">
    <UserName /> <span>{command}</span>
  </div>
);

export default OutputContainer;
