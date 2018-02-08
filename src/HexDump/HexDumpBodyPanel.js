import React,{Component} from 'react';
import "./HexDump.css";

import "../color-groups.css";

export class HexDumpBodyPanel extends Component {
    constructor(props) {
        super();

        this.state = {index:0};
    }
    render() {
        var items = [];

        console.log(this.props);

        for (var i=0;i<this.props.hexdump.length;i+=2) {
            items.push({offset:i, text:this.props.hexdump.substr(i,2)});
        }

        var self = this;

        return (
            <div className="hex-dump-body-panel">
                {items
                    .map(
                        function(el, idx) {
                            return (
                                <span className={"color-group"+(idx % 21)} data-offset={el.offset} key={el.offset}>{el.text}</span>
                            );
                        }
                    )
                }
            </div>
        );
    }
}