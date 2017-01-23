import React, { PropTypes } from 'react'


const BlendInfo = ({ name, containers, currency }) => (
    <div className="cafe-info-beans-blend" key={name}>
        <h3><small>{name}</small></h3>
        <table className="table-responsive">
            <thead>
            <tr>
                <th>Size</th>
                <th>&nbsp;</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                containers.map((container) => {
                    const info = container.M;
                    return (
                        <tr key={info.Size.N}>
                            <td>{info.Size.N} g</td>
                            <td>&nbsp;&nbsp;</td>
                            <td>{currency} {info.Price.N}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
);

BlendInfo.PropTypes = {
    name: PropTypes.string.isRequired,
    containers: PropTypes.array.isRequired
};

export default BlendInfo;
