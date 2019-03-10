import React, {Component, Fragment} from 'react';
import SmppDecoder from 'js-smpp';
import SimpleHexDump from "../HexDump/SimpleHexDump";

class SmppDecoderPage extends Component {
    constructor(props){
        super(props);

        let state = {value:null,buffer:null,result:null, meta: null};

        this.currentGroup = 0;

        if (window.location.hash !== null ) {
            let hash = window.location.hash.substr(1);

            let buf = Buffer.from(atob(hash));

            state = this.doDecode(buf.toString("hex"));
        }

        this.state = state;

        this.change = this.change.bind(this);
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

                            return (<tr key={decodedField.name} className={"color-group" + self.nextGroup()}>
                                <td>
                                    <span className="text-xs">no</span>
                                </td>
                                <td>
                                    {decodedField.name}
                                    {
                                        typeof decodedField.specRef !== "undefined"
                                        && decodedField.specRef!=="" && <div>ref: <span className="text-sm">{decodedField.specRef}</span></div>
                                    }
                                </td>
                                <td>
                                    <SimpleHexDump
                                        hexdump={decodedField.buffer}
                                        showOffset={false}
                                        showCharacters={false}
                                    />
                                </td>
                                <td>{decodedField.value.raw}</td>
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
                    />Добавить цветовое разделение полей
                </label>
                {decodedData !== null &&
                    <Fragment>
                        <ol>{notifications}</ol>
                        <table className="table table-stripped">
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
            window.location.hash = btoa(state.buffer.toString());
        }

        this.setState(state);
    }
}

export default SmppDecoderPage;