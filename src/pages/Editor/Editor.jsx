import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import EditorLesson from "../../components/EditorLesson/EditorLesson";
import db from "../../service/firebase";
import { collection, getDoc, doc } from "firebase/firestore";
import "./Editor.css";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";

function Editor() {
  const lessonRef = useRef(null);
  const editorRef = useRef(null);
  const url = useLocation();
  const [exerciseData, setExerciseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "exercises");
      const documentSnapshot = await getDoc(
        doc(collectionRef, "KzDG3NH84hfjFQajTcKM")
      );

      setExerciseData({ id: documentSnapshot.id, ...documentSnapshot.data() });
      setIsLoading(false);
    };
    setIsLoading(true);
    if (url.state != null) {
      if ("exercise_id" in url["state"]) {
        var exercise_id = url.state.exercise_id;
        console.log(exercise_id)
        fetchData();
      } else {
        setIsLoading(false);
        return () => {};
      }
    } else {
      setIsLoading(false);
      return () => {};
    }
  }, [url]);

  useEffect(() => {
    if (!isLoading) {
      let test = document.getElementsByClassName("gutter")[0];
      test.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        e.preventDefault();
        lessonRef.current.style.width = "35%";
        editorRef.current.style.width = "65%";
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  } else {
    let overview = "";
    let instructions = "";
    let defaultCode = "";
    let title = "";
    let module_path = [];
    if (url.state != null) {
      if ("module_path" in url.state) {
        module_path = url.state.module_path;
      }
    }
    if (exerciseData !== null) {
      title = exerciseData.title
      overview = exerciseData.overview
      instructions = exerciseData.instructions
      defaultCode = exerciseData.template
    }
    return (
      <>
        <div className="editor-page">
          <Split
            className="split"
            sizes={[35, 65]}
            gutterSize={12}
            gutterAlign="center"
          >
            <EditorLesson innerRef={lessonRef} overview={overview} instructions={instructions} module_path={module_path} title={title}/>
            <CodeEditor innerRef={editorRef} defaultCode={defaultCode} />
          </Split>
        </div>
      </>
    );
  }
}

export default Editor;
