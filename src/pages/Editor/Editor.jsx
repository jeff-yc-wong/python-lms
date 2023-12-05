import { useEffect, useRef } from "react";
import Split from "react-split";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import EditorLesson from "../../components/EditorLesson/EditorLesson";
import "./Editor.css";

function Editor() {
  const lessonRef = useRef(null);
  const editorRef = useRef(null);
  useEffect(() => {
    let test = document.getElementsByClassName("gutter")[0];
    test.addEventListener("dblclick", function (e) {
      e.stopPropagation();
      e.preventDefault();
      lessonRef.current.style.width = '35%';
      editorRef.current.style.width = '65%';
    });
  }, []);

  return (
    <>
    <div className="editor-page">
      <Split className="split" sizes={[35, 65]} gutterSize={12} gutterAlign="center">
        <EditorLesson innerRef={lessonRef}/>
        <CodeEditor innerRef={editorRef} />
      </Split>
    </div>
    </>
  );
}

export default Editor;
