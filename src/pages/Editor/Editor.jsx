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
  const [exercisesRef, setExercisesRef] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (exercise_id) => {
      const collectionRef = collection(db, "exercises");
      const documentSnapshot = await getDoc(
        doc(collectionRef, exercise_id)
      );

      setExerciseData({ id: documentSnapshot.id, ...documentSnapshot.data() });
      setIsLoading(false);
    };
    setIsLoading(true);
    if (url.state != null) {
      // console.log(url.state)
      if ("exercisesRef" in url["state"]) {
        var exercisesRef = url.state.exercisesRef;
        setExercisesRef(exercisesRef);
      }
      if ("exercise_id" in url["state"]) {
        var exercise_id = url.state.exercise_id;
        // console.log(exercise_id)
        fetchData(exercise_id);

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
    let sandbox = true;
    let checker = null;
    let exercise_id = null;
    if (url.state != null) {
      if ("module_path" in url.state) {
        module_path = url.state.module_path;
      }
    }
    if (exerciseData !== null && url.state !== null) {
      title = exerciseData.title;
      overview = exerciseData.overview;
      instructions = exerciseData.instructions;
      defaultCode = exerciseData.template;
      checker = exerciseData.checker;
      exercise_id = exerciseData.id
      sandbox = false;
    }

    console.log("sandbox", sandbox);
    return (
      <>
        <div className="editor-page">
          <Split
            className="split"
            sizes={[35, 65]}
            gutterSize={12}
            gutterAlign="center"
          >
            <EditorLesson innerRef={lessonRef} overview={overview} instructions={instructions} module_path={module_path} title={title} exercise_ref={exercisesRef} sandbox={sandbox}/>
            <CodeEditor innerRef={editorRef} defaultCode={defaultCode} checker={checker} exercise_id={exercise_id} sandbox={sandbox}/>
          </Split>
        </div>
      </>
    );
  }
}

export default Editor;
