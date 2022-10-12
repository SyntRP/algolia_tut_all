import React from "react";
import { SearchWrapper } from "./components/SearchWrapper";
import "./App.css";
import { SyntSearchWrapper } from "./synt/components/custom/SyntSearchWrapper";

const App = () => {
  return (
    <div className="app_container">
      {/* <SearchWrapper /> */}
      <SyntSearchWrapper />
    </div>
  );
};

export default App;
