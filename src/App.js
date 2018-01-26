import React, { Component } from 'react';
import './App.css';


class AppInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            extra: "||"
        };
    }


    render(){
      return <textarea className="App-input" onChange={() => this.setState({data: this.state.data + "ss"})} value={this.state.data + this.state.extra}></textarea>;
    }
}

class AppOutput extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <div className="App-output">First pass the data from the child to the parent, as an argument into a callback from the parent. Set this incoming parameter as a state on the parent component, then pass it as a prop to the other child (see above example). The sibling can
        </div>;
    }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Easy Code Generator</h1>
        </header>
        <div className="App-body">
          <AppInput />
          <AppOutput />
        </div>
      </div>
    );
  }
}

export default App;
