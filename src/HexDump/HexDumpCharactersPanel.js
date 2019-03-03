import React,{Component} from 'react';

import "./HexDump.css";
import Utils from "../Utils";
import {HexDump} from "./HexDump";

export class HexDumpCharactersPanel extends Component {
    constructor(props) {
        super(props);

        this.onChangeCursorOffset = this.onChangeCursorOffset.bind(this);
    }
    onChangeCursorOffset(event) {
        this.props.onChangeCursorOffset(event.target.dataset.offset);
    }
    render() {
        var hexElements = Utils.Text.hexToIntArray(this.props.hexdump);

        var characters =
            hexElements
                .map(
                    function(el) {
                        if (Utils.Text.isPrint(el)) {
                            return String.fromCharCode(el);
                        } else {
                            return ".";
                        }
                    }
            );

        var self = this;

        return (
            <div className="hex-dump-characters-panel">
                {characters
                    .map(
                        function(C, idx) {
                            return (
                                <span
                                    onMouseOver={self.onChangeCursorOffset}
                                    className={self.props.cursorOffset==idx ? "selected" : ""}
                                    key={idx}
                                    data-offset={idx}>{C}</span>
                            );
                        }
                    )}
            </div>
        );
    }
}