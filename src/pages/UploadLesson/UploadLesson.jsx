import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import './UploadLesson.css';

function UploadLesson() {
    const [text, setText] = useState(`Hello World \n
    Yay`);

    return (<>
        <form className="editor">
            <textarea
              spellCheck="false"
              className="write"
              value={text}
              rows={text.split('\n').length + 1}
              onChange={function (event) {
                setText(event.target.value)
              }}
            />
        </form>
        <div className="result">
          <Markdown
            className="markdown-body"
            remarkPlugins={[remarkGfm]}
          >
            {text}
          </Markdown>
        </div>
      </>);
}

export default UploadLesson;