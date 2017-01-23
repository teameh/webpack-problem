import React, { PropTypes as T } from 'react'
import HomeView from '../components/Home/HomeView'

export class Home extends React.Component {

    static contextTypes = {
        router: T.object
    };

    onChange(input, resolve) {
        console.log('onChanged() called with ' + input);

        let results = [];
        let url = 'https://dkedjs4vvb.execute-api.us-east-1.amazonaws.com/prod/suggest';
        let props = {
            options: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        };

        setTimeout(() => {
            let suggester = 'ninja_suggestions';
            props.url = url + '?q=' + input + '&suggester=' + suggester;
            fetch(props.url, props.options || {}).then((response) => {
                return response.json();
            }).then((x) => {
                return x.suggest;
            }).then((y) => {
                return y.suggestions;
            }).then((z) => {
                z.forEach((item) => {
                    results.push(item.suggestion);
                });
                resolve(results);
            }).catch(err => {
                console.log(err);
            });
        }, 25);

    }

    onSearch(input) {
        if (input) {
            let path = 'search?q=' + input;
            this.context.router.push(path)
        }
    }

    render() {
        return (
            <HomeView
                onSearch={this.onSearch.bind(this)}
                onChange={this.onChange.bind(this)}
            />
        )
    }
}

export default Home;
