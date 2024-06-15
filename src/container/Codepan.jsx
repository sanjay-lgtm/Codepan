import React, { useState, useEffect } from 'react';
import Split from 'react-split';

import './Codepan.css';
import JavaScript from '../Editor/JsEditor';
import Css from '../Editor/CssEditor';
import Html from '../Editor/HtmlEditor';

const CodePen = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleChange = (value, type) => {
    if (type === 'html') setHtml(value);
    else if (type === 'css') setCss(value);
    else if (type === 'js') setJs(value);
  };

  return (
    <div className="codepen-container">
      <Split
        sizes={[70, 30]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
        className="split-vertical"
      >
        <Split
          sizes={[33, 33, 33]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="split-horizontal"
        >
          <div className="editor-pane">
            <Html value={html} onChange={handleChange} />
          </div>
          <div className="editor-pane">
            <Css value={css} onChange={handleChange} />
          </div>
          <div className="editor-pane">
            <JavaScript value={js} onChange={handleChange} />
          </div>
        </Split>
        <div className="output-pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </Split>
    </div>
  );
};

export default CodePen;
