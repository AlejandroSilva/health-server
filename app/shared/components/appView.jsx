import React, { PropTypes } from 'react'
import {Link, RouteHandler} from 'react-router'
import ServerList from './ServerList.jsx'
import {connect} from 'react-redux'

@connect((state)=> ({ todos: state.todos }))
export default class AppView extends React.Component{
    static propTypes = {
        children: PropTypes.object
    }

    componentDidMount = ()=>{
        this.props.history.pushState(null, '/');
    }

    render(){
        return (
            <div id="app-view">
                <ServerList />
                <hr />
                {this.props.children}
                <RouteHandler/>
            </div>
        );
    }
}
//connect(
//    //mapStateToProps,
//    (state)=>{
//        return {
//            value: state.counter
//        }
//    },
//    //mapDispatchToProps
//    (dispatch)=>{
//        return {
//            onIncrement: ()=>{
//                console.log("EVENTO_INC")
//                dispatch({
//                    type: 'EVENTO_INC'
//                })
//            }
//        }
//    }
//)(AppView)