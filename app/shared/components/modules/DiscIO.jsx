import React from 'react'

export default class DiscIO extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
               <h3>DiscIO</h3>
                <p>{this.props.data.blockReadsPerSecond} <small>BRpS</small></p>
                <p>{this.props.data.blockWritesPerSecond} <small>BWpS</small></p>
                <p>{this.props.data.totalRequestPerSecond} <small>RpS</small></p>
            </div>
        )
    }
}