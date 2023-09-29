import "./App.css";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Split from "react-split";
import React, { useState } from 'react';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleButtonClick = () => {
    setIsCollapsed(!isCollapsed);

  };

  return (
    <div className="App">
      <Split className="split" sizes={[35, 65]}>
        <div id="lesson" className={`lesson ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="p-5 container text-start position-relative">
            <button type="button" className="btn" id="shrink-btn" onClick={handleButtonClick}>
              <i className="bi bi-arrow-left" style={{color: "white"}}></i>
            </button>
            <h3>Lesson</h3>
          </div>
        </div>
        <div style={{minWidth: "60vw"}}>
          <CodeEditor />
        </div>
      </Split>
    </div>
  );
}

export default App;
