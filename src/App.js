import React, { Component } from 'react';
import './App.css';
import {HexDump} from "./HexDump/HexDump";
import {CalcTextArea} from "./LengthTextArea/CalcTextArea";
import Utils from "./Utils";

class App extends Component {
    constructor(props) {
        super(props);

        var hash = window.location.hash;

        var oldText="";

        if (hash != null && hash.length>1) {
            oldText = Utils.Text.Hex.cleanup(hash.substr(1));
        }

        this.state = {
            text:oldText,
        };

        this.onChange = this.onChange.bind(this);
    }
    onChange(text) {
        this.setState({text: text});

        if (text.length <= 2000) {
            window.location.hash = '#' + text;
        }
    }
    render() {
        return (
            <div className="App">
                <HexDump hexdump={this.state.text} />
                <CalcTextArea rows="10" cols="50" text={this.state.text} onChange={this.onChange} />
                Link to this page:<a href={"#"+this.state.text}>#{this.state.text.length > 20 ? this.state.text.substr(0,20) : this.state.text}</a>
            </div>
        );
    }
}

export default App;