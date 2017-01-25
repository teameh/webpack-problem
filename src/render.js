import React from 'react'
import { match, RouterContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createPromiseCounter from 'redux-promise-counter'

import config from '../customer/linc.config.js'

const configMiddleware = config.redux.middleware || [];

const render = (url, callback) => {
    match({ routes: config.router.routes, location: url }, (error, redirectLocation, renderProps) => {
        
        if(error) {
            callback({resultCode:500, message: 'Error!'});
        } else if(redirectLocation) {
            callback({resultCode: 302, location: redirectLocation.pathname + redirectLocation.search});
        } else if (renderProps) {
            const promiseCounter = createPromiseCounter((state) => {
                const store = createStore(config.redux.reducer, state, applyMiddleware(...configMiddleware));
                const html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                callback(null, {resultCode: 200, body:html});
            });

            const middleware = [promiseCounter].concat(configMiddleware);

            const store = createStore(
                config.redux.reducer,
                applyMiddleware(...middleware)
            );

            const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            callback(null, {resultCode: 200, body:html});
        } else {
            callback(null, {resultCode: 404});
        }
    });
}

export default render