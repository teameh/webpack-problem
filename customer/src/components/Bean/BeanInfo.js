import React, { Component } from 'react'
import BlendInfo from './BlendInfo'

class BeanInfo extends Component {

    render() {
        const info = this.props.info;
        let img_src = 'https://s3.amazonaws.com/img.coffeebean.ninja/' + info.Id.S + '.png';
        let web_url = (info.Web && info.Web.S) || '';
        return (
            <div>
                <div className="bean-image">
                    <img src={img_src} role="presentation"/>
                </div>
                <br />
                <div>
                    <h5>Country of origin: <strong>{(info.Country && info.Country.S) || ''}</strong></h5>
                </div>
                <div>
                    <h5>Website: <strong><a href={web_url} target="_blank">{web_url}</a></strong>
                    </h5>
                </div>
                <h3>Blends</h3>
                <div className="row">
                    {
                        info.Blends.L.map((blend) => {
                            let info = blend.M;
                            let name = info.Name.S;
                            let descr = null;
                            let roast = null;
                            if (info.Roast !== undefined) {
                                roast = <div className="blend-item-roast">
                                    Roast: <strong>{info.Roast.S}</strong>
                                </div>
                            }
                            if (info.Description !== undefined) {
                                descr = <div className="blend-item-descr">{info.Description.S}</div>
                            }
                            return <BlendInfo
                                key={name}
                                name={name}
                                roast={roast}
                                descr={descr}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BeanInfo;
