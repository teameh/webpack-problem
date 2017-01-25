import React, { Component } from 'react'
import logoSM from '../../../public/img/logo-sm.png'

class Logo extends Component {

    render() {
        return (
            <div className="logo">
                <a href="/">
                    <img src={logoSM} role="presentation"/>
                </a>
            </div>
        )
    }
}

export default Logo;
