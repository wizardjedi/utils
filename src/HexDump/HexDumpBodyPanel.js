import React,{Component} from 'react';
import "./HexDump.css";

export class HexDumpBodyPanel extends Component {
    constructor(props) {
        super();
    }
    render() {
        var items = [];

        console.log(this.props);

        for (var i=0;i<this.props.hexdump.length;i+=2) {
            items.push({offset:i, text:this.props.hexdump.substr(i,2)});
        }

        return (
            <div className="hex-dump-body-panel">
                {items
                    .map(
                        function(el) {
                            return (
                                <span data-offset={el.offset} key={el.offset}>{el.text}</span>
                            );
                        }
                    )
                }
            </div>
        );
    }
}