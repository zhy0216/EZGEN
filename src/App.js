import React, { Component } from 'react';
import './App.css';
import {EZen} from "./EZen";


const EXAMPLE1 = `{
  "address": {
    "state": "CA",
    "city": "San Francisco"
  },
  "interests": [
    "games"
  ],
  "name": "Yang"
}`;

class AppInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: EXAMPLE1
        }
    };



    handleChange(event) {
        const newJson = event.target.value;
        this.setState({value: newJson});
        this.props.callbackJson(newJson);
    }


    render() {
        return (<div className="App-input">
            <select onChange={this.handleChange.bind(this)} name="text">
                <option value={EXAMPLE1}>Example 1</option>
                <option value={EXAMPLE1}>Example 2</option>
                <option value={EXAMPLE1}>Example 3</option>
            </select>
            <textarea onChange={this.handleChange.bind(this)} value={this.state.value}></textarea>
        </div>);
    };
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
        this.ezen = new EZen();
        const newJson = JSON.parse(EXAMPLE1);
        this.ezen.generateTypes(newJson);
        let data = this.ezen.outputMarshMallow();
        this.state = {
            json: EXAMPLE1,
            data: data,
        };


    }

    callbackJson(newString) {
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
                    <AppInput callbackJson={this.callbackJson.bind(this)} />
                    <AppOutput data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default App;
