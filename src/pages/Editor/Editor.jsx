import Split from "react-split";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import "./Editor.css";

function Editor() {
  return (
    <>
    <div className="editor-page">
      <Split className="split" sizes={[35, 65]}>
        <div id="lesson" className="p-5 container text-start">
          <h3>Lesson</h3>
        </div>
        <div>
          <CodeEditor style={{width: "300px !important"}}/>
        </div>
      </Split>
    </div>
    </>
  );
}

export default Editor;