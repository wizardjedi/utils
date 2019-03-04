import React, {Component} from 'react';
import SmppParser from 'ut-codec-smpp';
import Utils from '../Utils';

class SmppDecoderPage extends Component {
    constructor(props){
        super(props);

        this.state = {value:"",result:null, meta: null};
    }
    render() {
        let decodedData = null;

        if (this.state.result !== null) {
            decodedData =
                Object
                    .keys(this.state.result.body)
                    .map(
                        (key) => {
                            if (key === "tlvs") {
                                return (<tr key="tlvs"><td colSpan="2">TLV</td></tr>);
                            }

                            return (<tr key={key}><td>{key}</td><td>{this.state.result.body[key]}</td></tr>);
                        }
                    );
        }

        return (
            <div>
                <textarea rows="20" cols="60" value={this.state.value} onChange={(e)=>this.change(e.target.value)} />
                {decodedData !== null &&
                <table><tbody>{decodedData}</tbody></table>}
            </div>
        );
    }
    change(value) {
        let parser = new SmppParser({});

        let intArr =
            Utils
                .Text
                .hexToIntArray(
                    "000000040000000000000001" + value.replace("~\\s*~gi","").trim()
                );

        let meta = {};
        
        let result = parser.decode(new Buffer(intArr), meta);

        this.setState({value, result, meta});
    }
}

export default SmppDecoderPage;