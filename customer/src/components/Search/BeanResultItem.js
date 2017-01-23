import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const basePath = '/beans/';

const imgBasePath = 'https://s3.amazonaws.com/img.coffeebean.ninja/';
const imgExtension = '.png';

const BeanResultItem = ({ id, name, blends }) => (
    <div className="col-lg-4 result-item">
        <div className="result-item-content">
            <h3><Link to={basePath + id}>{name}</Link></h3>
            <Link to={basePath + id}><img src={imgBasePath + id + imgExtension} role="presentation"/></Link>
            <hr />
            <ul className="list-unstyled">
                {
                    blends.map(function(blend) {
                        return <li key={blend}>{blend}</li>;
                    })
                }
            </ul>
        </div>
    </div>
);

BeanResultItem.PropTypes = {
    id: PropTypes.string.isRequired,
    blends: PropTypes.array,
    name: PropTypes.string.isRequired
};

export default BeanResultItem;
