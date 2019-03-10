import React,{Component} from 'react';
import {HexDumpOffsetPanel} from "./HexDumpOffsetPanel";
import {HexDumpBodyPanel} from "./HexDumpBodyPanel";
import {HexDumpCharactersPanel} from "./HexDumpCharactersPanel";
import "./HexDump.css";
import PropTypes from 'prop-types';
import * as HexDumpConstants from "./constants";

export class HexDump extends Component {
    constructor(props) {
        super(props);

        this.changeCursorOffset = this.changeCursorOffset.bind(this);

        this.state = {
            cursorOffset:null,
            changeCursorTimer:null
        };
    }
    changeCursorOffset(offset) {
        if (this.state.changeCursorTimer != null) {
            clearTimeout(this.state.changeCursorTimer);
        }

        var newState = Object.assign({}, this.state);

        var self = this;

        newState.changeCursorTimer =
            setTimeout(
                function() {
                    clearTimeout(self.state.changeCursorTimer);

                    self.setState({cursorOffset:offset, changeCursorTimer:null});
                },
                10
            );

        this.setState(newState);
    }
    render() {
        return (
            <div className="hex-dump-panel">
                <div className="hex-dump-container">
                    <HexDumpOffsetPanel
                        cursorOffset={this.state.cursorOffset}
                        hexDumpLength={this.props.hexdump.length/2}
                        stripeRowCount={this.props.stripeRowCount}
                        columnsCount={this.props.columnsCount}
                    />
                    <HexDumpBodyPanel
                        onChangeCursorOffset={this.changeCursorOffset}
                        cursorOffset={this.state.cursorOffset}
                        hexdump={this.props.hexdump}
                        stripeRowCount={this.props.stripeRowCount}
                        columnsCount={this.props.columnsCount}
                    />
                    <HexDumpCharactersPanel
                        onChangeCursorOffset={this.changeCursorOffset}
                        cursorOffset={this.state.cursorOffset}
                        hexdump={this.props.hexdump}
                        stripeRowCount={this.props.stripeRowCount}
                        columnsCount={this.props.columnsCount}
                    />

                    <div className="clearer" />
                </div>
            </div>
        );
    }
}

HexDump.propTypes = {
    hexdump: PropTypes.string.isRequired,
    stripeRowCount: PropTypes.number.isRequired,
    columnsCount: PropTypes.number.isRequired
};

HexDump.defaultProps = {
    stripeRowCount: HexDumpConstants.DEFAULT_STRIPE_ROW_COUNT,
    columnsCount: HexDumpConstants.DEFAULT_COLUMNS_COUNT
};