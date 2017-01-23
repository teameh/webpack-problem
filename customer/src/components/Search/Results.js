import React, { Component } from 'react'
import CafeResultItem from './CafeResultItem'
import BeanResultItem from './BeanResultItem'

class Results extends Component {

    get header() {
        const q = this.props.query;
        const n = this.props.searchResults.length;
        let r = '';
        if (n === 0) {
            r = 'No results found';
        } else {
            r = 'Found ' + n + ' result' + (n===1 ? '' : 's');
        }
        r += ' for \'' + q + '\'';
        return r;
    }

    render () {
        let resultItems = this.props.searchResults.map((result) => {
            if (result.fields.type === 'cc') {
                return <CafeResultItem
                    key={result.id}
                    id={result.id}
                    {...result.fields}
                />
            } else {
                let blends = result.fields.blends;
                let top_four = blends.sort().slice(0, 4);
                const diff = blends.length - top_four.length;
                if (diff > 0) {
                    top_four.push('+' + diff + ' more');
                }
                return <BeanResultItem
                    key={result.id}
                    id={result.id}
                    name={result.fields.name}
                    blends={top_four}
                />
            }
        });

        return (
            <div>
                <div className="results-header">
                    <h3>{this.header}</h3>
                </div>
                <div className="results-body">
                    <div className="row">
                        {resultItems}
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
