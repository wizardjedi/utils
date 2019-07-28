import React, {Component, Fragment} from 'react';
import SmppDecoder from 'js-smpp';
import SimpleHexDump from "../HexDump/SimpleHexDump";
import { Base64 } from 'js-base64';

class SmppDecoderPage extends Component {
    constructor(props){
        super(props);

        let state = {
            value:null,
            buffer:null,
            result:null,
            meta: null,
            settings:{
                dissectingFieldsColors:false
            }
        };

        this.currentGroup = 0;

        let decodeState = {};

        if (window.location.hash !== null ) {
            let hash = window.location.hash.substr(1);

            //let buf = Buffer.from(atob(hash),"hex");
            let buf = Buffer.from(hash, "hex");

            decodeState = this.doDecode(buf.toString("hex"));
        }

        this.state = Object.assign({}, state, decodeState);

        this.change = this.change.bind(this);

        this.changeSettings = this.changeSettings.bind(this);
    }
    changeSettings(key, value) {
        let oldState = this.state;

        oldState.settings[key] = value;

        this.setState(Object.assign({}, oldState));
    }
    renderFieldValue(value) {
        if (typeof value === "object") {
            let result = [];

            for (let i in value) {
                result.push(<><dt>{i}</dt><dd>{value[i]}</dd></>);
            }

            return result;
        } else {
            return <>{value}</>;
        }
    }
    render() {
        let decodedData = null;
        let notifications = null;

        if (this.state.result !== null) {
            this.currentGroup = 0;

            let self = this;

            decodedData =
                Object
                    .keys(this.state.result.data)
                    .map(
                        (key) => {
                            let decodedField = this.state.result.data[key];
                            let className = "";

                            if (self.state.settings.dissectingFieldsColors) {
                                className = "color-group" + self.nextGroup();
                            }

                            return (<tr key={decodedField.name} className={className}>
                                <td>
                                    <span className="text-xs">no</span>
                                </td>
                                <td>
                                    <div>{decodedField.name}</div>
                                    {
                                        typeof decodedField.specRef !== "undefined"
                                        && decodedField.specRef!=="" && <div><small>ref: <span>{decodedField.specRef}</span></small></div>
                                    }
                                    <small>Offset: {decodedField.offset}</small>&nbsp;
                                    <small>Length: {decodedField.length}</small>
                                </td>
                                <td>
                                    <SimpleHexDump
                                        hexdump={decodedField.buffer}
                                        showOffset={false}
                                        showCharacters={false}
                                    />
                                </td>
                                <td>{this.renderFieldValue(decodedField.value.interpreted)}</td>
                                <td></td>
                            </tr>);
                        }
                    );

            notifications =
                this
                    .state
                    .result
                    .notifications
                    .getAll()
                    .map(
                        ({tag, body, offset}) => <li key={"notification"+offset}>{body} at offset:{offset}</li>
                    );
        }

        return (
            <div>
                <h1>PDU Hex dump</h1>
                <textarea
                    style={{width:"100%"}}
                    rows={8}
                    placeholder="Введите HEX-dump SMPP PDU"
                    defaultValue={this.state.value}
                    onChange={this.change}
                />
                <div>
                    <a href={window.location}>Link to this page</a>
                </div>
                {
                    this.state.buffer &&
                    <Fragment>
                        <h1>Hex dump representation</h1>
                        <SimpleHexDump hexdump={this.state.buffer} groups={this.state.result.data} />
                    </Fragment>
                }

                <h1>Decoded data</h1>
                <label>
                    <input
                        type="checkbox"
                        value={this.state.settings.dissectingFieldsColors}
                        onChange={(e)=>this.changeSettings("dissectingFieldsColors", e.target.checked)}
                    />Добавить цветовое разделение полей
                </label>
                {decodedData !== null &&
                    <Fragment>
                        <ol>{notifications}</ol>
                        <table className="table table-stripped table-sm">
                            <thead>
                                <tr>
                                    <th title="Validation">Val</th>
                                    <th title="Field name and specification reference">Field</th>
                                    <th title="Hex dump representation">Hex</th>
                                    <th title="Interpreted value">Value</th>
                                    <th title="Comment">Comment</th>
                                </tr>
                            </thead>
                            <tbody>{decodedData}</tbody>
                        </table>
                    </Fragment>

                }
            </div>
        );
    }
    nextGroup() {
        if (this.currentGroup >= 20) {
            this.currentGroup = 1;
        } else {
            this.currentGroup++;
        }

        return this.currentGroup;
    }
    doDecode(value) {
        let decoder = new SmppDecoder();

        value = value.replace("~[^0-9a-fA-F]~gim", "").trim();

        if (value.length % 2 === 0) {
            let buffer = Buffer.from(value, "hex");

            try {
                let result =
                    decoder
                        .decode(buffer, true, "SUBMIT_SM");

                return ({value, buffer, result});
            } catch (e) {
                return ({value, buffer:null, result: null});
            }
        }
    }
    change(e) {
        let state = this.doDecode(e.target.value);

        if (state.buffer !== null) {
            ///window.location.hash = btoa(state.buffer.toString("hex"));
            window.location.hash = state.buffer.toString("hex");
        }

        this.setState(Object.assign({}, this.state, state));
    }
}

export default SmppDecoderPage;