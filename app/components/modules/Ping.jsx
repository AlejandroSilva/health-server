// React
import React, { PropTypes } from 'react'

// Components
import {
    Box, BoxHeader, BoxBody
} from '../ui/index.js'

export default class Ping extends React.Component{
    render(){
        const data = this.props.data
        const perMin = Math.round(data.min*100/data.max)
        const perAvg = Math.round(data.avg*100/data.max)
        //const perMax = 100
        const minWidth = perMin
        const avgWidth = perAvg-perMin
        const maxWidth = 100-perAvg

        if(this.props.isRow===true){
            return (
                <Box>
                    <BoxHeader>
                        <h4 className="box-title">{this.props.title}</h4>
                        <p className='pull-right' style={{margin: 0}}>{data.min}/{data.avg}/{data.max}</p>
                    </BoxHeader>
                    <BoxBody>
                        <p style={{margin: 0}}>
                            <b>{data.address}</b>
                            <small className='pull-right' style={{margin: 0}}>{data.successfullAttemps}/{data.attempts} correctos</small>
                        </p>
                        <div className="progress" style={{margin: 0}}>
                            <div className="progress-bar progress-bar-success" style={{width: minWidth+'%'}}>
                                {data.min}
                            </div>
                            <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: avgWidth+'%'}}>
                                {data.avg}
                            </div>
                            <div className="progress-bar progress-bar-danger" style={{width: maxWidth+'%'}}>
                                {data.max}
                            </div>
                        </div>
                    </BoxBody>
                </Box>
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