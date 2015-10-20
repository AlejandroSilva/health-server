// React
import React, { PropTypes } from 'react'

// Components
import {
    Box, BoxHeader, BoxBody
} from '../ui/index.js'

class Cpu extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentIdle>80? (this.props.data.percentIdle>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            return (
                <Box>
                    <BoxHeader>
                        <h3 className="box-title">CPU  </h3>
                        <p className='pull-right' style={{margin: 0}}>Idle: {this.props.data.percentIdle}%</p>
                    </BoxHeader>
                    <BoxBody>
                        <div className="progress progress-xs active" style={{margin: 0}}>
                            <div className={'progress-bar progress-xs '+barColor} style={{width: this.props.data.percentIdle+'%'}}></div>
                        </div>
                    </BoxBody>
                </Box>
            )
        }
        else{
            return (
                <div className="box box-primary">
                    <div className="box-header">
                        <h4 className="box-title">CPU</h4>
                    </div>
                    <div className="box-body">
                        <p>{this.props.data.idlePercent}% idle</p>
                    </div>
                </div>
            )
        }
    }
}
Cpu.propTypes = {
    isRow: PropTypes.bool,
    data: PropTypes.shape({
        model: PropTypes.string,
        percentIdle: PropTypes.number,
        percentSys: PropTypes.number,
        percentUser: PropTypes.number,
        secMeasured: PropTypes.number,
        speed: PropTypes.number
    }).isRequired
}
Cpu.defaultProps = {
    isRow: false
}

export default Cpu