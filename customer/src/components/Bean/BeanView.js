import React, { Component, PropTypes } from 'react'
import Spinner from 'react-spinkit'
import BeanInfo from './BeanInfo'
import Menu from '../Menu'

class BeanView extends Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        hasFailed: PropTypes.bool.isRequired,
        info: PropTypes.object.isRequired
    };

    render() {
        const { isFetching, hasFailed, info } = this.props;

        let results = <div>No results found.</div>;
        if (isFetching) {
            results = <Spinner
                spinnerName="three-bounce"
                noFadeIn
            />;
        } else if (!hasFailed) {
            results = <BeanInfo
                key={(info.Id && info.Id.S) || ''}
                info={info}
            />
        }

        return (
            <div>
                <Menu />
                <div className="jumbotron">
                    <div className="container">
                        <h2><strong>{(info.Name && info.Name.S) || ''}</strong></h2>
                    </div>
                </div>
                <div className="container">
                    <div className="bean-box">
                        {results}
                    </div>
                </div>
            </div>
        )
    }
}

export default BeanView;
