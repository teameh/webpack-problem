import React, { PropTypes } from 'react'
import Menu from '../Menu'
import SearchBox from '../SearchBox'

const HomeView = ({ showLogo, showSuggestions, onSearch, onChange }) => (
    <div>
        <Menu showLogo={false} />
        <div className="col-lg-5 col-lg-offset-4">
            <div className="imaginary-container">
                <div className="logo-home">
                    <img src="/img/logo.png" role="presentation"/>
                </div>
                <SearchBox
                    showSuggestions={true}
                    placeholder='What are you looking for?'
                    onSearch={onSearch}
                    onChange={onChange}
                />
            </div>
        </div>
    </div>
);

HomeView.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default HomeView
