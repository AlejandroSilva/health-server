import React from 'react'

export default class Cpu extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <h3>Ping {this.props.data.address}</h3>
                <p>{this.props.data.address}:{this.props.data.port}</p>
                <p>{this.props.data.avg} <small>avg</small></p>
                <p>{this.props.data.min} <small>min</small></p>
                <p>{this.props.data.max} <small>max</small></p>
                <p>{this.props.data.successfullAttemps} of {this.props.data.attempts} <small>correct</small></p>
            </div>
        )
    }
}