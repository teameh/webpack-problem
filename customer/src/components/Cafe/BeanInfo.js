import React, { PropTypes } from 'react'
import BlendInfo from './BlendInfo'
import { Link } from 'react-router'

const basePath = '/beans/';

const BeanInfo = ({ id, name, blends, currency }) => (
    <div className="cafe-info-beans-brand" key={name}>
        <h3><Link to={basePath + id}>{name}</Link></h3>
        {
            blends.map((blend) => {
                let name = blend.M.Name.S;
                return (
                    <BlendInfo
                        key={name}
                        name={name}
                        containers={blend.M.Containers.L}
                        currency={currency}
                    />
                )
            })
        }
    </div>
);

BeanInfo.PropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    blends: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired
};

export default BeanInfo;
