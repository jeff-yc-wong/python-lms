import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./EditorLesson.css";
import { useLocation, useNavigate } from "react-router-dom";

// If we want to render HTML in our lesson we can install and import the following:
// import rehypeRaw from 'rehype-raw'
//
function EditorLesson({
  innerRef,
  overview,
  instructions,
  module_path,
  title,
  exercise_ref,
  sandbox,
}) {
  const url = useLocation();
  const navigate = useNavigate();

  if (url.state === null) {
    exercise_ref = null;
  }
  if (
    overview === undefined ||
    overview === null ||
    overview === "" ||
    url.state === null
  ) {
    overview =
      "###### Sandbox\n # Welcome to PythonLMS\nWelcome to the Python Playground! On this magical editor page, you get to write and play with Python code like a wizard casting spells. The editor is your enchanted quill that helps you write Python spells, and with a wave of your wand (or rather, a click of a button!), watch your code come to life! It's like painting with colors but with words! Fix your potions, create new spells, and see the magic happen right before your eyes. Dive in, explore, and have a blast learning the language of the future! ";
  }
  if (
    instructions === undefined ||
    instructions === null ||
    instructions === "" ||
    url.state === null
  ) {
    instructions = "Toggle the canvas then try running the code in the editor!";
  }

  let module_path_string = "";

  if (
    module_path !== undefined &&
    module_path !== null &&
    module_path.length !== 0
  ) {
    module_path_string = module_path.join("/");
  }

  if (
    title !== undefined &&
    title !== null &&
    title !== "" &&
    url.state !== null
  ) {
    overview = "# " + title + "\n" + overview;
  }

  const handleClick = (e) => {
    if (e.target.className === "bi bi-arrow-left h4") {
      if (exercise_ref.index === 0) {
        return navigate("/modules", {
          state: { lesson_id: exercise_ref.lesson_id },
        });
      } else {
        return navigate("/editor", {
          state: {
            exercise_id:
              exercise_ref.exercises[exercise_ref.index - 1].reference,
            module_path: module_path,
            exercisesRef: {
              index: exercise_ref.index - 1,
              lesson_id: exercise_ref.lesson_id,
              exercises: exercise_ref.exercises,
            },
          },
        });
      }
    } else if (e.target.className === "bi bi-arrow-right h4") {
      if (exercise_ref.index < exercise_ref.exercises.length - 1) {
        return navigate("/editor", {
          state: {
            exercise_id:
              exercise_ref.exercises[exercise_ref.index + 1].reference,
            module_path: module_path,
            exercisesRef: {
              index: exercise_ref.index + 1,
              lesson_id: exercise_ref.lesson_id,
              exercises: exercise_ref.exercises,
            },
          },
        });
      } else {
        return navigate("/modules", {
          state: { lesson_id: exercise_ref.lesson_id },
        });
      }
    }
  };

  return (
    <div ref={innerRef} id="lesson" className="text-start">
      <div className="ps-2 fw-bold fs-5 instruction-divider">
        <i className="bi bi-eyeglasses h5 pe-2"></i>Learn{" "}
      </div>
      {exercise_ref != null || sandbox === false? (
        <div>
          <button className="btn btn-link text-light" onClick={handleClick}>
            <i className="bi bi-arrow-left h4"></i>
          </button>
          <button
            className="btn btn-link text-light float-end"
            onClick={handleClick}
          >
            <i className="bi bi-arrow-right h4"></i>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="pt-2 ps-4 pe-4 pb-2 markdown-body">
        <h6 className="module-path" onClick={() => navigate(-1)}>
          {module_path_string}
        </h6>
      </div>

      <Markdown
        children={overview}
        className="ps-4 pe-4 pb-4 markdown-body"
        remarkPlugins={remarkGfm}
        urlTransform={(url) =>
          url.startsWith("data") ? url : defaultUrlTransform(url)
        }
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dracula}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />

      <div className="ps-2 fw-bold fs-5 instruction-divider">
        <i className="bi bi-check-square h5 pe-2"></i>Instructions{" "}
      </div>

      <Markdown
        children={instructions}
        className="p-4 markdown-body"
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) =>
          url.startsWith("data") ? url : defaultUrlTransform(url)
        }
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dracula}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />

      {/* {
        //TODO: Hint Section
      } */}
    </div>
  );
}

export default EditorLesson;
