import React, { Component } from 'react'
import { connect } from 'react-redux'
import CafeView from '../components/Cafe/CafeView'
import { setCafeId, fetchCafeIfNeeded, invalidateCafe } from '../actions/cafe'

class Cafe extends Component {

    componentWillMount() {
        const { id, dispatch } = this.props;
        dispatch(setCafeId(id));
        dispatch(invalidateCafe(id));
        dispatch(fetchCafeIfNeeded(id));
    }

    render() {
        const { isFetching, hasFailed, item } = this.props;
        return (
            <CafeView
                isFetching={isFetching}
                hasFailed={hasFailed}
                info={item}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { cafeById } = state;
    let { id } = state;
    if (ownProps.params !== 'undefined') {
        id = ownProps.params['cafe'] || id;
    }

    const {
        isFetching,
        hasFailed,
        lastUpdated,
        item
    } = cafeById[id] || {
        isFetching: true,
        hasFailed: false,
        item: {}
    };

    return {
        id,
        item,
        hasFailed,
        isFetching,
        lastUpdated
    }
};

export default connect(mapStateToProps)(Cafe);
