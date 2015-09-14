import React from 'react'

export default class DiscIO extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
               <h3>Ram</h3>
                <p>{this.props.data.free} <small>Free</small></p>
                <p>{this.props.data.kbfree} <small>kbfree</small></p>
                <p>{this.props.data.used} <small>Used</small></p>
                <p>{this.props.data.kbused} <small>kbused</small></p>
            </div>
        )
    }
}