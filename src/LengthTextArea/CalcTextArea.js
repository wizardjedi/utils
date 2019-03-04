import React,{Component} from 'react';

export class CalcTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textLength: null,
            error:null,
            timer:null
        };

        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        if (this.state.timer != null) {
            return ;
        }

        var self = this;

        var target = event.target;

        let timer = setTimeout(
            function() {
                var rawText = target.value;

                var hexDump = (rawText != null ? rawText.replace(/[^0-9a-fA-F]/gim, "") : "");

                var hexDumpLength = hexDump.length;

                if (hexDumpLength % 2 === 0) {
                    self.setState({textLength: hexDump.length / 2, error: null});
                } else {
                    self.setState({textLength: Math.floor(hexDump.length / 2), error: "Not enough input"});
                }

                clearTimeout(self.state.timer);
                self.state.timer = null;

                if (!!self.props.onChange) {
                    self.props.onChange(hexDump);
                }
            },
            500
        );

        this.setState(Object.assign({}, this.state, {timer}));
    }
    render() {
        var error;

        if (this.state.error != null) {
            error = (<span className='error'>{this.state.error}</span>);
        }

        return (
            <div>
                <textarea defaultValue={this.props.text} rows={this.props.rows} cols={this.props.cols} onChange={this.onChange} onKeyUp={this.onChange}></textarea><br />
                <span>Length: {this.state.textLength}</span>
                <br />
                {error}
            </div>
        );
    }
}