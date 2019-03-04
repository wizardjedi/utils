import React,{Component} from 'react';
import {HexDumpOffsetPanel} from "./HexDumpOffsetPanel";
import {HexDumpBodyPanel} from "./HexDumpBodyPanel";
import {HexDumpCharactersPanel} from "./HexDumpCharactersPanel";
import "./HexDump.css";

export class HexDump extends Component {
    constructor(props) {
        super(props);

        this.changeCursorOffset = this.changeCursorOffset.bind(this);

        this.state = {
            cursorOffset:null,
            changeCursorTimer:null
        };
    }
    changeCursorOffset(offset) {
        if (this.state.changeCursorTimer != null) {
            clearTimeout(this.state.changeCursorTimer);
        }

        var newState = Object.assign({}, this.state);

        var self = this;

        newState.changeCursorTimer =
            setTimeout(
                function() {
                    clearTimeout(self.state.changeCursorTimer);

                    self.setState({cursorOffset:offset, changeCursorTimer:null});
                },
                10
            );

        this.setState(newState);
    }
    render() {
        return (
            <div className="hex-dump-panel">
                <div className="hex-dump-container">
                    <HexDumpOffsetPanel cursorOffset={this.state.cursorOffset} hexDumpLength={this.props.hexdump.length/2} />
                    <HexDumpBodyPanel onChangeCursorOffset={this.changeCursorOffset} cursorOffset={this.state.cursorOffset} hexdump={this.props.hexdump} />
                    <HexDumpCharactersPanel
                        onChangeCursorOffset={this.changeCursorOffset}
                        cursorOffset={this.state.cursorOffset}
                        hexdump={this.props.hexdump}
                    />

                    <div className="clearer" />
                </div>
            </div>
        );
    }
}