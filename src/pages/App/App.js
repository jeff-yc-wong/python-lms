import "./App.css";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Split from "react-split";

function App() {
  return (
    <div className="App">
      <Split className="split" sizes={[35, 65]}>
        <div id="lesson" className="p-5 container text-start">
          <h3>Lesson</h3>
        </div>
        <div style={{minWidth: "65%"}}>
          <CodeEditor />
        </div>
      </Split>
    </div>
  );
}

export default App;
