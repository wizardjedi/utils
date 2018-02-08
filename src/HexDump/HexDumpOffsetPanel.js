import React,{Component} from 'react';
import "./HexDump.css";
import {HexDump} from "./HexDump";

export class HexDumpOffsetPanel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var rows = [];

        for (var i=0;i<this.props.hexDumpLength;i+=16) {
            var offset = ("000000000000" + i).substr(-12);

            rows[i] = (function(){return (<span data-offset={i} key={i}>{offset}</span>)}());
        }

        return (
            <div className="hex-dump-offset-panel">
                {rows}
            </div>
        );
    }
}