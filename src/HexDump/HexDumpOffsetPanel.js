import React,{Component} from 'react';
import "./HexDump.css";
import PropTypes from 'prop-types';
import * as HexDumpConstants from "./constants";

export class HexDumpOffsetPanel extends Component {
    render() {
        let rows = [];

        let row = this.props.cursorOffset != null ? this.props.cursorOffset >> 4 : null;

        let rowCounter = 0;

        let minimumOffsetLength16 = Math.ceil(Math.log2(this.props.hexDumpLength)/Math.log2(16)+1);
        let minimumOffsetLength10 = Math.ceil(Math.log2(this.props.hexDumpLength)/Math.log2(10)+1);

        let rowsCount = Math.ceil(this.props.hexDumpLength / this.props.columnsCount);

        let stripeCount =
            Math
                .ceil(
                    this.props.hexDumpLength / ( this.props.columnsCount * this.props.stripeRowCount )
                );

        for (let stripe=0;stripe<stripeCount;stripe++) {
            // рендерим строку
        }

        return <div>length: {this.props.hexDumpLength} rows:{rowsCount} Need {stripeCount}</div>;

        /*for (let row=0, i=0;i<this.props.hexDumpLength;i+=16,rowCounter++) {
            if (i % this.props.columnsCount == 0) {
                rows.push(<div className="hex-dump-stripeRow">);
            }

            let offset16 = ("000000000000" + i.toString(16).toUpperCase()).substr(-minimumOffsetLength16);
            let offset10 = ("000000000000" + i).substr(-minimumOffsetLength10);

            let classes = [
                (((i >> 4) % 2 === 0) ? "strip-odd" : "strip-even"),
                (row != null && row === i >> 4 ? "selected" : ""),
            ];

            rows
                    .push(
                            <span
                                className={classes.join(" ")}
                                data-offset={i}
                                key={i}
                            >{offset10}:{offset16}</span>
                    );

            if (
                i % this.props.
                && (i % 16 * this.props.stripeRowCount) == 0
            ) {
                row++;
            }
        }

        return (
            <div className="hex-dump-offset-panel">
                {rows}
            </div>
        );*/
    }
}

HexDumpOffsetPanel.propTypes = {
    hexDumpLength: PropTypes.number.isRequired,

    stripeRowCount: PropTypes.number.isRequired,
    columnsCount: PropTypes.number.isRequired
};

HexDumpOffsetPanel.defaultProps = {
    stripeRowCount: HexDumpConstants.DEFAULT_STRIPE_ROW_COUNT,
    columnsCount: HexDumpConstants.DEFAULT_COLUMNS_COUNT
};