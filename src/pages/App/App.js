import "./App.css";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Split from "react-split";

function App() {
  return (
    <div className="App">
      <Split className="split" sizes={[35, 65]}>
        <div className="p-5 container text-start">Lesson</div>
        <div>
          <CodeEditor />
        </div>
      </Split>
    </div>
  );
}

export default App;
