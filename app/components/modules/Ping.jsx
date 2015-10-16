// React
import React, { PropTypes } from 'react'

export default class Ping extends React.Component{
    render(){
        const data = this.props.data
        const total = data.min+data.avg+data.max
        let min, avg, max
        min = total>100? data.min*100/total: data.min
        avg = total>100? data.avg*100/total: data.avg
        max = total>100? data.max*100/total: data.max

        if(this.props.isRow===true){
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h4 className="box-title">{this.props.title}</h4>
                        <p className='pull-right' style={{margin: 0}}>{data.min}/{data.avg}/{data.max}</p>
                    </div>
                    <div className="box-body" style={{paddingTop: '0px', paddingBottom: '3px'}}>
                        <p style={{margin: 0}}>
                            <b>{data.address}</b>
                            <small className='pull-right' style={{margin: 0}}>{data.successfullAttemps}/{data.attempts} correctos</small>
                        </p>
                        <div className="progress" style={{margin: 0}}>
                            <div className="progress-bar progress-bar-success" style={{width: min+'%'}}>
                                {data.min}
                            </div>
                            <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: avg+'%'}}>
                                {data.avg}
                            </div>
                            <div className="progress-bar progress-bar-danger" style={{width: max+'%'}}>
                                {data.max}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Ping {this.props.data.address}</h3>

                    <p>{this.props.data.address}:{this.props.data.port}</p>

                    <p>{this.props.data.avg}
                        <small>avg</small>
                    </p>
                    <p>{this.props.data.min}
                        <small>min</small>
                    </p>
                    <p>{this.props.data.max}
                        <small>max</small>
                    </p>
                    <p>{this.props.data.successfullAttemps} of {this.props.data.attempts}
                        <small>correct</small>
                    </p>
                </div>
            )
        }
    }
}
Ping.propTypes = {
    title: PropTypes.string,
    isRow: PropTypes.bool,
    data: PropTypes.shape({
        address: PropTypes.string,
        attempts: PropTypes.number,
        avg: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        port: PropTypes.number,
        successfullAttemps: PropTypes.number,
        totalTimeSpent: PropTypes.number
    }).isRequired
}
Ping.defaultProps = {
    title: 'Ping',
    isRow: false
}

export default Ping