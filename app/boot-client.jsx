//import React  from 'react'
//import Router from 'react-router'
//import routes from "./shared/routes.jsx"

//Router.run(route, Router.HistoryLocation, (Root)=>{
//    React.render(
//        <Root/>,
//        document.getElementById('appRoot')
//    )
//});

//import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './shared/store/configureStore.js';
import App from './shared/containers/App.js';
import CounterApp from './shared/components/Counter.js'

const initialState = window.__INITIAL_STATE__ || 666;

const store = configureStore(initialState);

const rootElement = document.getElementById('appRoot');

React.render(
    <Provider store={store}>
        {() => <CounterApp/>}
    </Provider>,
    rootElement
);