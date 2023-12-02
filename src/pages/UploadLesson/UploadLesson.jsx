import { useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown, { defaultUrlTransform } from "react-markdown";
import AceEditor from "react-ace";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-twilight";

import "./UploadLesson.css";

function UploadLesson() {
  const [text, setText] = useState(`Hello World \n\n    Yay`);

  return (
    <>
      <div className="container-fluid" 
            style={{
              height: "93vh",
            }}>
        <div className="row h-100">
          <div className="p-4 col h-100 ace-editor-container">
            <AceEditor
              id="lesson-editor"
              mode="markdown"
              theme="twilight"
              value={text}
              onChange={function (value) {
                setText(value);
              }}
              showPrintMargin={false}
              style={{
                width: "80%",
              }}
            />
          </div>
          <div className="p-4 col">
            <div className="result">
              <Markdown
                children={text}
                className="markdown-body"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadLesson;
