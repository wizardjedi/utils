import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Utils from "../Utils";
import "./simple-hex-dump.css";
import "../color-groups.css";

class SimpleHexDump extends Component {
    constructor(props) {
        super(props);

        this
            .state = {
                showOffset: this.props.showOffset,
                showHex: this.props.showHex,
                showCharacters: this.props.showCharacters
            };

        this.currentGroup=0;

        this.onFilterClick = this.onFilterClick.bind(this);
    }
    onFilterClick(filterName) {
        let state = this.state;

        state[filterName] = !state[filterName];

        this.setState(Object.assign({}, state));
    }
    renderOffsetPanel() {
        let hexDumpLength = this.props.hexdump.byteLength;

        let minimumLength10 = Math.ceil(Math.log10(hexDumpLength));
        let minimumLength16 = Math.ceil(Math.log2(hexDumpLength) / Math.log2(16));

        let offsets = [];
        let offset = 0;
        while (offset < hexDumpLength) {
            offsets
                .push(
                    "0x"
                    + offset.toString(16).padStart(minimumLength16,"0")
                    + ":"
                    + offset.toString(10).padStart(minimumLength10,"0")
                );

            offset+=16;

            if (offset < hexDumpLength) {
                offsets.push(<br key={"offset-offset-"+offset} />);
            }
        }

        return <div className="simple-hex-dump-offset-panel"><code>{offsets}</code></div>;
    }
    renderHexPanel() {
        let dump = [];

        let hexDumpLength = this.props.hexdump.byteLength;

        this.currentGroup = 0;

        for (let offset = 0;offset < hexDumpLength;offset++) {
            this.endGroup(offset, dump);
            this.startGroup(offset, dump);

            dump.push(this.props.hexdump.readUInt8(offset).toString(16).padStart(2,"0"));

            if (
                (offset % 4 === 3)
                && (offset % 16 !== 15)
            ) {
                dump.push(" |");
            }

            if (offset % 16 < 15) {
                dump.push(" ");
            }

            if (offset>0 && offset % 16 === 15) {
                dump.push("<br />");
            }
        }

        this.endGroup(hexDumpLength, dump);

        return <div className="simple-hex-dump-body-panel"><code dangerouslySetInnerHTML={{__html:dump.join("")}} /></div>;
    }
    renderCharactersPanel() {
        this.currentGroup = 0;

        let dump = [];

        let hexDumpLength = this.props.hexdump.byteLength;

        for (let offset = 0;offset < hexDumpLength;offset++) {
            this.endGroup(offset, dump);
            this.startGroup(offset, dump);

            let charCode = this.props.hexdump.readUInt8(offset);

            let char = Utils.Text.isPrint(charCode) ? String.fromCodePoint(charCode) : ".";

            dump.push(char);

            if (
                (offset % 4 === 3)
                && (offset % 16 !== 15)
            ) {
                dump.push(" |");
            }

            if (offset % 16 < 15) {
                dump.push(" ");
            }

            if (offset>0 && offset % 16 === 15) {
                dump.push("<br  />");
            }
        }

        this.endGroup(hexDumpLength, dump);

        return <div className="simple-hex-dump-characters-panel"><code dangerouslySetInnerHTML={{__html: dump.join("")}} /></div>;
    }
    startGroup(offset, array) {
        if (typeof this.props.groups === "undefined" || this.props.groups.length == 0) {
            return ;
        }
        for (let i in this.props.groups) {
            let curGroup = this.props.groups[i];

            if (curGroup.offset === offset) {
                this.currentGroup++;

                array.push("<span class=\"color-group"+this.currentGroup+"\" title=\""+curGroup.name+"\">");

                break;
            }
        }
    }
    endGroup(offset, array) {
        if (typeof this.props.groups === "undefined" || this.props.groups.length == 0) {
            return ;
        }
        for (let i in this.props.groups) {
            let curGroup = this.props.groups[i];

            if (curGroup.offset + curGroup.length === offset) {
                array.push("</span>");
                break;
            }
        }
    }
    render() {
        this.currentGroup=0;

        if (
            typeof this.props.hexdump === "undefined"
            || this.props.hexdump == null
        ) {
            return "";
        }

        let panels = [];

        if (this.state.showOffset) {
            panels.push(this.renderOffsetPanel());
        }

        if (this.state.showHex) {
            panels.push(this.renderHexPanel());
        }

        if (this.state.showCharacters) {
            panels.push(this.renderCharactersPanel());
        }

        return (
            <div className="a1s-simple-hex-dump">
                <table className="simple-hex-dump">
                    <tbody>
                        <tr>
                            {panels.map((el, index) => <td key={"of"+index} style={{padding:"0px 10px"}}>{el}</td>)}
                        </tr>
                    </tbody>
                </table>
                <div>
                    <label className="a1s-simple-hex-dump-btn-xs">
                        <input
                            type="checkbox"
                            className="form-element"
                            checked={this.state.showOffset}
                            onChange={()=>this.onFilterClick("showOffset")}
                        />Offset
                    </label>

                    <label className="a1s-simple-hex-dump-btn-xs">
                        <input
                            type="checkbox"
                            className="form-element"
                            checked={this.state.showHex}
                            onChange={()=>this.onFilterClick("showHex")}
                        />Hex
                    </label>

                    <label className="a1s-simple-hex-dump-btn-xs">
                        <input
                            type="checkbox"
                            className="form-element"
                            checked={this.state.showCharacters}
                            onChange={()=>this.onFilterClick("showCharacters")}
                        />Characters
                    </label>
                </div>
            </div>
        );
    }
}

SimpleHexDump.propTypes = {
    hexdump: PropTypes.object.isRequired,
    groups: PropTypes.array
};

SimpleHexDump.defaultProps = {
    showOffset: true,
    showHex: true,
    showCharacters: true,
};

export default SimpleHexDump;