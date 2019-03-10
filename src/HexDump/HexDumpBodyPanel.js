import React,{Component} from 'react';
import "./HexDump.css";

import "../color-groups.css";

export class HexDumpBodyPanel extends Component {
    constructor(props) {
        super();

        this.onChangeCursorOffset = this.onChangeCursorOffset.bind(this);

        this.state = {index:0};
    }
    onChangeCursorOffset(event) {
        this.props.onChangeCursorOffset(event.target.dataset.offset);
    }
    render() {
        var items = [];

        var offset=0;
        for (var i=0;i<this.props.hexdump.length;i+=2, offset++) {
            items.push({offset:offset, text:this.props.hexdump.substr(i,2)});
        }

        var self = this;

        return (
            <div className="hex-dump-body-panel">
                <pre>
                {items
                    .map(
                        function(el, idx) {
                            return (
                                <span
                                    onMouseOver={self.onChangeCursorOffset}
                                    data-offset={el.offset}
                                    className={self.props.cursorOffset===el.offset ? "selected" : ""}
                                    key={el.offset}>{el.text}</span>
                            );
                        }
                    )
                }
                </pre>
            </div>
        );
    }
}