import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

import Home from './home.jsx'

@connect(
    (state)=> {
        return{
            counter: state.counter,
            estadoCompleto: state
        }
    },
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators({
            CounterActions: CounterActions,
            ServersActions: ServersActions
        }, dispatch)
    }
)
class Counter extends Component {
    metodo(){
        console.log(this.props)
        console.log(this.state)
    }
    render() {
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        return (
            <p>
                Clicked: {counter} times
                {' '}
                <button onClick={CounterActions.increment}>+</button>
                {' '}
                <button onClick={CounterActions.decrement}>-</button>
                {' '}
                <button onClick={CounterActions.incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={() => CounterActions.incrementAsync()}>Increment async</button>
                <br/>

                <Home  sumarUno={ CounterActions.increment } />
                <button onClick={ this.metodo.bind(this) }></button>
            </p>
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
//        return bindActionCreators(CounterActions, dispatch)
//    }
//)(Counter)
export default Counter;