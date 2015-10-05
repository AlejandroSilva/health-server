import React from 'react'

export default class DiscIO extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className="info-box bg-green">
                <span className="info-box-icon">
                    <i className="fa fa-database"></i>
                </span>
                <div className="info-box-content">
                    <span className="progress-description">{this.props.data.blockReadsPerSecond} <b>BRpS</b></span>
                    <span className="progress-description">{this.props.data.blockWritesPerSecond} <b>BWpS</b></span>
                    <span className="progress-description">{this.props.data.totalRequestPerSecond} <b>RpS</b></span>
                </div>
            </div>
        )
    }
}