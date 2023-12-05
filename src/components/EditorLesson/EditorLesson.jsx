import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./EditorLesson.css";

// If we want to render HTML in our lesson we can install and import the following:
// import rehypeRaw from 'rehype-raw'
//
function EditorLesson({ innerRef }) {
  const lesson = `###### HELLO WORLD
  # Welcome
  Python is a programming language. Like other languages, it gives us a way to communicate ideas. In the case of a programming language, these ideas are “commands” that people use to communicate with a computer!
  
  We convey our commands to the computer by writing them in a text file using a programming language. These files are called programs. Running a program means telling a computer to read the text file, translate it to the set of operations that it understands, and perform those actions.
  `;

  const instructions = `
  
  Change \`PythonLMS\` to your name in the script to the right. Run the code to see what it does!
  
  As soon as you’re ready, move on to the next exercise to begin learning to write your own Python programs!
  `;

  // const hints = [];

  return (
    <div ref={innerRef} id="lesson" className="text-start">
      <div className="ps-2 fw-bold fs-5 instruction-divider">
        <i className="bi bi-eyeglasses h5 pe-2"></i>Learn{" "}
      </div>

      <Markdown
        children={lesson}
        className="p-4 markdown-body"
        // remarkPlugins={}
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

      {
        //TODO: Hint Section
      }
    </div>
  );
}

export default EditorLesson;
