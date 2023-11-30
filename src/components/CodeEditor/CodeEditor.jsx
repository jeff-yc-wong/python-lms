import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "./CodeEditor.css";

function outf(text) {
  var mypre = document.getElementById("output");
  mypre.style.color = "black";
  mypre.style.fontWeight = "normal";
  mypre.innerHTML = mypre.innerHTML + text;
}

function erroutf(text) {
  var mypre = document.getElementById("output");
  mypre.style.color = "red";
  mypre.style.fontWeight = "bold";
  mypre.innerHTML = mypre.innerHTML + text;
  mypre.innerHTML = mypre.innerHTML + "\n";
}
function builtinRead(x) {
  if (
    window.Sk.builtinFiles === undefined ||
    window.Sk.builtinFiles["files"][x] === undefined
  )
    throw new Error("File not found: '" + x + "'");
  return window.Sk.builtinFiles["files"][x];
}

function runit(code) {
  var prog = code;
  console.log(prog);
  var mypre = document.getElementById("output");
  mypre.innerHTML = "";
  window.Sk.pre = "output";
  window.Sk.configure({
    output: outf,
    read: builtinRead,
    inputfunTakesPrompt: true,
    __future__: window.Sk.python3,
    execLimit: 3600000,
  });
  (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target =
    "mycanvas";
  var myPromise = window.Sk.misceval.asyncToPromise(function () {
    return window.Sk.importMainWithBody("<stdin>", false, prog, true);
  });
  myPromise.then(
    function (mod) {
      //   console.log("success");
    },
    function (err) {
      console.log(err.toString());
      erroutf(err);
    }
  );
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

function CodeEditor() {
  var defaultCode = `import turtle
  
t = turtle.Turtle()
  
for c in ['red', 'green', 'yellow', 'blue']:
  t.color(c)
  t.forward(75)
  t.left(90)
  
print("Hello World")`;

  const [code, setCode] = useState(defaultCode);

  const handleCodeChange = (e) => {
    setCode(e);
  };

  return (
    <div id="codeeditor" className="m-0 p-0 container">
      <div className="row justify-content-center">
        <div className="col">
          <h3>Code</h3>
          <form>
            <AceEditor
              mode="python"
              theme="twilight"
              onChange={handleCodeChange}
              defaultValue={defaultCode}
            />
            <br />
            <button
              className="btn btn-success"
              type="button"
              onClick={() => runit(code)}
            >
              Run
            </button>
          </form>
        </div>

        <div className="col">
          <div className="row justify-content-center">
            <h3>Canvas</h3>
            <div id="mycanvas"></div>
          </div>
        </div>
      </div>

      <div className="mt-3 row justify-content-center">
        <div className="col">
          <h3>Output</h3>
          <pre id="output"></pre>
          <br />
          <button
            className="btn btn-success"
            type="button"
            onClick={clearOutput}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
