import React, { Component } from 'react';
import './App.css';


class AppInput extends React.Component {

    render(){
      return <textarea className="App-input" onChange={this.props.onChange}></textarea>;
    }
}

class AppOutput extends React.Component {
    render(){
        return <div className="App-output">{this.props.data} First pass the data from the child to the parent, as an argument into a callback from the parent. Set this incoming parameter as a state on the parent component, then pass it as a prop to the other child (see above example). The sibling can
        </div>;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: "",
            data: ""
        };


    }

    inputJson(event) {
        let newString = event.target.value;
        let newJson = null;
        try{
            newJson = JSON.parse(newString);
        }catch(error) {
            this.setState({data: error.toString()});
            return
        }
        if(newJson !== null && newJson !== this.state.json){
            this.setState({json: newJson});
            let data = newString;
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
