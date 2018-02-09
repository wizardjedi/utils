import React, { Component } from 'react';
import './App.css';
import {HexDump} from "./HexDump/HexDump";
import {CalcTextArea} from "./LengthTextArea/CalcTextArea";

import Buffer from 'buffer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text:""
        };

        this.onChange = this.onChange.bind(this);
    }
    onChange(text) {
        this.setState({text: text});
    }
    render() {
        return (
            <div className="App">
                <HexDump hexdump={this.state.text} />

                <CalcTextArea rows="10" cols="50" onChange={this.onChange} />
            </div>
        );
    }
}

export default App;