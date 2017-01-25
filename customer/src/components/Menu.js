import React, { Component } from 'react'
import { Link } from 'react-router'
import logoSX from '../../public/img/logo-xs.png'

class Menu extends Component {

    render() {
        let logo;
        if (this.props.showLogo) {
            logo = <Link to="/" activeClassName="active" className="navbar-left">
                <img src={logoSX} role="presentation" />
            </Link>
        }

        return (
            <nav className="navbar navbar-default navbar-static-top navbar-menu">
                <div className="container">
                    {logo}
                    <div id="navbar-collapse" className="collapse navbar-collapse">
                        {/*<ul className="nav navbar-nav">*/}
                            {/*<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>*/}

                        {/*</ul>*/}
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login" activeClassName="active">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

Menu.propTypes = {
    showLogo: React.PropTypes.bool
};

Menu.defaultProps = {
    showLogo: true
};

export default Menu;
