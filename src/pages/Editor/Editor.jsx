import Split from "react-split";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import EditorLesson from "../../components/EditorLesson/EditorLesson";
import "./Editor.css";

function Editor() {
  return (
    <>
    <div className="editor-page">
      <Split className="split" sizes={[35, 65]}>
        <div id="lesson" className="p-4 container-flex text-start">
          <EditorLesson />
        </div>
        <div className="p-4 container-flex">
          <CodeEditor  style={{width: "300px !important"}}/>
        </div>
      </Split>
    </div>
    </>
  );
}

export default Editor;
