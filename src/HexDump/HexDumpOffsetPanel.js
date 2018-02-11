import React,{Component} from 'react';
import "./HexDump.css";
import {HexDump} from "./HexDump";

export class HexDumpOffsetPanel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var rows = [];

        var row = this.props.cursorOffset != null ? this.props.cursorOffset >> 4 : null;

        for (var i=0;i<this.props.hexDumpLength;i+=16) {
            var offset = ("000000000000" + i).substr(-12);

            rows[i] = (
                function(){
                    return (
                        <span
                            className={row != null && row == i >> 4 ? "selected" : ""}
                            data-offset={i}
                            key={i}
                        >{offset}</span>
                    )
                }()
            );
        }

        return (
            <div className="hex-dump-offset-panel">
                {rows}
            </div>
        );
    }
}