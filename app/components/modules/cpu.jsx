import React from 'react'

export default class Cpu extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className="box box-primary">
                <div className="box-header">
                    <h4 className="box-title">CPU</h4>
                </div>
                <div className="box-body">
                    <p>{this.props.data[0].idlePercent}% idle</p>
                </div>
            </div>
        )
    }
}