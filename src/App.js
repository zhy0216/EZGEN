import React, { Component } from 'react';
import './App.css';
import {EZen} from "./EZen";

class AppInput extends React.Component {

    render(){
      return <textarea className="App-input" onChange={this.props.onChange}></textarea>;
    }
}

class AppOutput extends React.Component {
    render(){
        return (<pre className="App-output">
                    <code>{this.props.data}</code>
                </pre>);
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: "",
            data: ""
        };
        this.ezen = new EZen();

    }

    inputJson(event) {
        let newString = event.target.value;
        let newJson = null;
        try{
            newJson = JSON.parse(newString);
            if(typeof newJson !== "object"){
                throw new Error("please pass an object");
            }
        }catch(error) {
            this.setState({data: error.toString()});
            return
        }
        if(newJson !== null && newJson !== this.state.json){
            this.setState({json: newJson});
            this.ezen.clear();
            this.ezen.generateTypes(newJson);
            let data = this.ezen.outputMarshMallow();
            this.setState({data: data});
        }

    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Easy Code Generator</h1>
                </header>
                <div className="App-body">
                    <AppInput onChange={this.inputJson.bind(this)} />
                    <AppOutput data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default App;
