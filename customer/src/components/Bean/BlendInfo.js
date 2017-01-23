import React, { PropTypes } from 'react'


const BlendInfo = ({ name, descr, roast }) => (
    <div className="col-lg-4 blend-item" key={name}>
        <div className="blend-item-contents">
            <div className="blend-item-name">
                <strong>{name}</strong>
            </div>
            {descr}
            {roast}
        </div>
    </div>
);

BlendInfo.PropTypes = {
    name: PropTypes.string.isRequired,
    descr: PropTypes.object.isRequired,
    roast: PropTypes.object.isRequired
};

export default BlendInfo;
