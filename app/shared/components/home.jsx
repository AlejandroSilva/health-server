import React, { PropTypes } from 'react'
import { connect }            from 'react-redux';


class Home extends React.Component{
    static propTypes = {
        sumarUno: PropTypes.func.isRequired
    }
    render(){
        return (
            <div>
                <h1>Home de la app</h1>
                <button onClick={this.props.sumarUno}>uno mas</button>
            </div>
        )
    }
}
//Home.propTypes = {
//    sumarUno: PropTypes.func.isRequired
//}
export default Home