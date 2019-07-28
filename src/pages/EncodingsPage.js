import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EncodingsPage extends Component {
    render() {
        return (
            <div>
                {this.props.encodingName}
                <Row from={1} to={10} />
            </div>
        );
    }
}

function Row(params) {
    //console.log(arguments);

    return <div>Ok {params.from} to {params.to}</div>;
}

EncodingsPage.propTypes = {
    encodingName: PropTypes.string.isRequired,
};

export default EncodingsPage;

export const encodingParameterizedPage = ({match}) => <EncodingsPage encodingName={match.params.encodingName} />;