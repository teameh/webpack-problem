import React, { Component } from 'react'
import { connect } from 'react-redux'
import BeanView from '../components/Bean/BeanView'
import { setBeanId, fetchBeanIfNeeded, invalidateBean } from '../actions/bean'

class Bean extends Component {

    componentWillMount() {
        const { id, dispatch } = this.props;
        dispatch(setBeanId(id));
        dispatch(invalidateBean(id));
        dispatch(fetchBeanIfNeeded(id));
    }

    render() {
        const { isFetching, hasFailed, item } = this.props;
        return (
            <BeanView
                isFetching={isFetching}
                hasFailed={hasFailed}
                info={item}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { beanById } = state;
    let { id } = state;
    if (ownProps.params !== 'undefined') {
        id = ownProps.params['bean'] || id;
    }

    const {
        isFetching,
        hasFailed,
        lastUpdated,
        item
    } = beanById[id] || {
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

export default connect(mapStateToProps)(Bean);
