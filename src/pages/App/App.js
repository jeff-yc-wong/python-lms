import "./App.css";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import TopMenu from "../../components/TopMenu";
import Split from "react-split";

function App() {
  return (
    <div className="App">
      <TopMenu />
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
