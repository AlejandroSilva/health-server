import React from 'react'

export default class Cpu extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <h3>CPU</h3>
                <p>{this.props.data[0].idlePercent}% idle</p>
            </div>
        )
    }
}