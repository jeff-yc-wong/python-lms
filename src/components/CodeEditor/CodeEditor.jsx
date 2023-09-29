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

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
  var prog = document.getElementById("yourcode").value;
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
    document.getElementById("output").innerHTML = "> ";
}

function CodeEditor() {
  var defaultCode = `import turtle

t = turtle.Turtle()

for c in ['red', 'green', 'yellow', 'blue']:
    t.color(c)
    t.forward(75)
    t.left(90)

print("Hello World")`;

  return (
    <div id="editor" className="ms-0 p-4 container text-start">
      <div className="row justify-content-center">
        <div className="col">
          <h3>Code</h3>
          <form>
            <textarea
              id="yourcode"
              cols="50"
              rows="10"
              defaultValue={defaultCode}
            ></textarea>
            <br />
            <button className="btn btn-success" type="button" onClick={runit}>
              Run
            </button>
          </form>
        </div>

        <div className="col">
        <h3>Canvas</h3>
        <div id="mycanvas"></div>
        </div>
      </div>
      <div className="mt-3 row">
          <div className="col"> 
              <h3>Output</h3>
              <pre id="output"></pre>
              <br />
              <button className="btn btn-success" type="button" onClick={clearOutput}>
                Clear
              </button>
          </div>
      </div>
    </div>
  );
}

export default CodeEditor;