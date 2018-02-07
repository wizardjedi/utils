import React,{Component} from 'react';
import {HexDumpOffsetPanel} from "./HexDumpOffsetPanel";
import {HexDumpBodyPanel} from "./HexDumpBodyPanel";
import {HexDumpCharactersPanel} from "./HexDumpCharactersPanel";
import "./HexDump.css";

export class HexDump extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }
    render() {
        return (
            <div className="hex-dump-panel">
                <div className="hex-dump-container">
                    <div>
                        {this.props.hexdump}
                    </div>

                    <HexDumpOffsetPanel hexDumpLength={this.props.hexdump.length/2} />
                    <HexDumpBodyPanel />
                    <HexDumpCharactersPanel />

                    <div className="clearer" />
                </div>
            </div>
        );
    }
}