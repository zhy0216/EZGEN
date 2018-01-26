import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Easy Code Generator</h1>
        </header>
          <textarea className="App-input"></textarea>
          <div className="App-output">
          </div>
      </div>
    );
  }
}

export default App;
