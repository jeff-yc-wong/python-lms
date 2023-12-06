import { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "./CodeEditor.css";

function outf(text) {
  var mypre = document.getElementById("output");
  mypre.style.color = "black";
  mypre.style.fontWeight = "normal";
  mypre.innerText = mypre.innerText + text;
}

function erroutf(text) {
  var mypre = document.getElementById("output");
  mypre.style.color = "red";
  mypre.style.fontWeight = "bold";
  mypre.innerText = mypre.innerText + text;
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
    function (debug) {
      // console.log("success");
    },
    function (err) {
      console.log("error");
      console.log(err.toString());
      erroutf(err);
    }
  );
}

function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

function CodeEditor({ innerRef, defaultCode }) {
  if (defaultCode === undefined || defaultCode === null || defaultCode === "") {
  defaultCode =
`import turtle

t = turtle.Turtle()

for c in ['red', 'green', 'yellow', 'blue']:
    t.color(c)
    t.forward(75)
    t.left(90)
    
    
print("Hello World")`;
  }

  const [code, setCode] = useState(defaultCode);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef(null);

  const initialState = showCanvas.valueOf();

  const handleCodeChange = (e) => {
    setCode(e);
  };

  const editor_style = {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    width: "100%",
    height: "45vh",
    minHeight: "400px",
    fontSize: "small",
    minWidth: "400px",
  };
  
  const toggleCanvas = () => {
    setShowCanvas(!showCanvas);
  }

  useEffect(() => { 
    let canvas = canvasRef.current;
    if (initialState) {
      canvas.classList.add("show");
    }
  }, [initialState]);

  return (
    <div ref={innerRef} id="codeeditor" className="p-4">
      <div className="row">
        <div className="col">
          <h3 className="float-start">Code</h3>
          <AceEditor
            mode="python"
            theme="twilight"
            onChange={handleCodeChange}
            defaultValue={defaultCode}
            style={editor_style}
            showPrintMargin={false}
            scrollMargin={[10, 10, 0, 0]}
            enableLiveAutocompletion={true}
          />
          <button
            className="mt-3 btn btn-success float-start"
            type="button"
            onClick={() => runit(code)}
          >
            Run
          </button>
          <div
            className="mt-3 form-check form-switch float-end fs-5"
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={showCanvas}
              onChange={toggleCanvas}
              id="flexSwitchCheckDefault"
              data-bs-toggle="collapse"
              data-bs-target="#canvas-div"
            />
            <label
              className="form-check-label fs-6 fw-bold"
              htmlFor="flexSwitchCheckDefault"
            >
              Show Canvas
            </label>
          </div>
        </div>
        <div ref={canvasRef} id="canvas-div" className={`col-md-auto collapse-horizontal collapse`}>
          <h3 className="text-start">Canvas</h3>
          <div id="mycanvas"></div>
        </div>
      </div>

      <div className="mt-3 row">
        <div className="col">
          <pre id="output" className="bg-dark text-bg-dark" />
          <button
            className="pt-1 btn btn-success float-end"
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
