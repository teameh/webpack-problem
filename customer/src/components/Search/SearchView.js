import React, { Component, PropTypes } from 'react'
import Results from './Results'
import SearchBox from '../SearchBox'
import Menu from '../Menu'
import Logo from '../Logo/Logo'
import Spinner from 'react-spinkit'


export class SearchView extends Component {

    static propTypes = {
        query: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired
    };

    render() {
        const { query, items, isFetching, onSearch, onChange } = this.props;
        let results;
        if (isFetching) {
            results = <Spinner
                spinnerName="three-bounce" noFadeIn
            />;
        } else {
            results = <Results
                searchResults={items}
                query={query}
            />
        }
        return (
            <div>
                <Menu showLogo={false} />
                <div className="container">
                    <Logo />
                    <div className="col-lg-9 col-lg-offset-0">
                        <SearchBox
                            placeholder='What are you looking for?'
                            defaultValue={query}
                            onChange={onChange}
                            onSearch={onSearch}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="results-box">
                        <div className="container">
                            {results}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchView
