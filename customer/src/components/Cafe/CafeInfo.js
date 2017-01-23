import React, { Component } from 'react'
import BeanInfo from './BeanInfo'

class CafeInfo extends Component {

    render() {
        const info = this.props.info;
        return (
            <div className="cafe-info">
                <h3>{info.Address.S}</h3>
                <h3>{info.City.S},&nbsp;{info.State.S}&nbsp;{info.Postcode.S}</h3>
                <div className="leftimage">
                    <img src="/img/phone.png" role="presentation"/>
                </div>
                <div className="righttext">
                    <h2>
                        <small>{info.Phone.S}</small>
                    </h2>
                </div>
                <div className="cafe-info-beans">
                    {
                        info.Beans.L.map((bean) => {
                            let name = bean.M.Name.S;
                            return (
                                <BeanInfo
                                    key={name}
                                    id={bean.M.Id.S}
                                    name={name}
                                    blends={bean.M.Blends.L}
                                    currency={info.Currency.S}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CafeInfo;
