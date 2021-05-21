import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
  return (
    <div id="theapp">
      <header className="App-header">
        <pre dangerouslySetInnerHTML={{__html: `<span>123456</span>
          <span>789456</span>`}}>
        </pre>
        {/*
          import React from 'react'
          ReactDOM.render(<div></div>, mountNode)
        */}
      </header>
    </div>
  );
}

export default App;
