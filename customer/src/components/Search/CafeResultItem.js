import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const basePath = '/cafes/';

const CafeResultItem = ({ id, beans, name, address, city }) => (
    <div className="col-lg-4 result-item">
        <div className="result-item-content">
            <h3><Link to={basePath + id}>{name}</Link></h3>
            <h5>{address}</h5>
            <h5>{city}</h5>
            <hr />
            <ul className="list-inline">
                {
                    beans.map(function(bean) {
                        return <li key={bean}>{bean}</li>;
                    })
                }
            </ul>
        </div>
    </div>
);

CafeResultItem.PropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    beans: PropTypes.array
};

export default CafeResultItem;
