import React, { PropTypes } from 'react'

class Cpu extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentIdle>80? (this.props.data.percentIdle>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h3 className="box-title">CPU  </h3>
                        <p className='pull-right' style={{margin: 0}}>Idle: {this.props.data.percentIdle}%</p>
                    </div>
                    <div className="box-body">
                        <div className="progress progress-xs active" style={{margin: 0}}>
                            <div className={'progress-bar progress-xs '+barColor} style={{width: this.props.data.percentIdle+'%'}}></div>
                        </div>
                    </div>
                </div>
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