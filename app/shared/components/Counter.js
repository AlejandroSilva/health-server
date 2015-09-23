import React, { Component, PropTypes } from 'react';

import Home from './home.jsx'

@connect(
    (state)=> {
        return{
            counter: state.counter
        }
    },
    (dispatch)=>{
        return bindActionCreators(CounterActions, dispatch)
    }
)
class Counter extends Component {
    render() {
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        return (
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
                <br/>

                <Home  sumarUno={ ()=>{ increment() }} />
            </p>
        );
    }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/counter.js';

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
//        return bindActionCreators(CounterActions, dispatch)
//    }
//)(Counter)
export default Counter;