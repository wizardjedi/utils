import React,{Component} from 'react';
import "./HexDump.css";

export class HexDumpOffsetPanel extends Component {
    render() {
        var rows = [];

        for (var i=0;i<this.props.hexDumpLength;i+=16) {
            rows[i] = (function(){return (<span data-offset={i} key={i}>{i}</span>)}());
        }

        return (
            <div className="hex-dump-offset-panel">
                {rows}
            </div>
        );
    }
}