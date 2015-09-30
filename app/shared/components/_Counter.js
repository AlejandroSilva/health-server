/*
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'
import { reduxRouteComponent, routerStataReducer as router } from 'redux-router'
import { Link } from 'react-router'

import Home from './home.jsx'

@connect(
    (state)=> {
        // no entregar a la Smart View todos elementos del store
        return{
            counter: state.counter,
            estadoCompleto$$$$$$$$$$$$$$: state,
            routerState: state.router
        }
    },
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            //CounterActions: CounterActions,
            //ServersActions: ServersActions
            Object.assign({}, CounterActions, ServersActions)
        , dispatch)
    }
)
class Counter extends Component {
    metodo(){
        // QUITAR!!
        console.log(this.props)
        let { dispatch } = this.props
        console.log( dispatch )
    }
    render() {
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        return (
            <div>
                <p>
                    Clicked: {counter} times
                    {' '}
                    <button onClick={increment}>+</button>
                    {' '}
                    <button onClick={decrement}>-</button>
                    {' '}
                    <button onClick={incrementIfOdd}>Increment if odd</button>
                    {' '}
                    <button onClick={() => incrementAsync()}>Increment async</button>
                </p>
                <Home  sumarUno={ increment } />
                <button onClick={ this.metodo.bind(this) }>Counter.js:method</button>
            </div>
        );
    }
}

//Counter.propTypes = {
//    increment: PropTypes.func.isRequired,
//    incrementIfOdd: PropTypes.func.isRequired,
//    incrementAsync: PropTypes.func.isRequired,
//    decrement: PropTypes.func.isRequired,
//    counter: PropTypes.number.isRequired
//};
//export default connect(
//    (state)=> {
//        return{
//            counter: state.counter
//        }
//    },
//    (dispatch)=>{
//        return bindActionCreators(
//            Object.assign({}, CounterActions, ServersActions),
//            //CounterActions,
//            dispatch
//        )
//    }
//)(Counter)
export default Counter;

*/