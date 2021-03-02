import React from "react";
import "./App.css";
import Webcam from "./components/camera";
interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <div className="App">
      <Webcam />
    </div>
  );
};

export default App;
