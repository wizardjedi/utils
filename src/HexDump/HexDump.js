import React,{Component} from 'react';
import {HexDumpOffsetPanel} from "./HexDumpOffsetPanel";
import {HexDumpBodyPanel} from "./HexDumpBodyPanel";
import {HexDumpCharactersPanel} from "./HexDumpCharactersPanel";
import "./HexDump.css";

export class HexDump extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="hex-dump-panel">
                <div className="hex-dump-container">
                    <HexDumpOffsetPanel hexDumpLength={this.props.hexdump.length/2} />
                    <HexDumpBodyPanel hexdump={this.props.hexdump} />
                    <HexDumpCharactersPanel />

                    <div className="clearer" />
                </div>
            </div>
        );
    }
}