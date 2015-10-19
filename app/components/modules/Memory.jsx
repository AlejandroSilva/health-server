// React
import React, { PropTypes } from 'react'

class DiscIO extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentUsed>80? (this.props.data.percentUsed>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            const percentFree = Math.round(this.props.data.kbfree*100/this.props.data.kbtotal)
            const percentUsed = 100-percentFree
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h4 className="box-title">Memoria</h4>
                        <p className='pull-right' style={{margin: 0}}>Total: {this.props.data.used}</p>
                    </div>
                    <div className="box-body" style={{paddingTop: '0px', paddingBottom: '3px'}}>
                        <p style={{margin: 0}}>
                            Usado: <b>{this.props.data.used}</b>    Libre: <b>{this.props.data.free}</b>
                        </p>
                        <div className="progress" style={{margin: 0}}>
                            <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: percentUsed+'%'}}>
                                {percentUsed}%
                            </div>
                            <div className="progress-bar progress-bar-success" style={{width: percentFree+'%'}}>
                                {percentFree}%
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
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
}
DiscIO.propTypes = {
    isRow: PropTypes.bool,
    data: PropTypes.shape({
        kbfree: PropTypes.number,
        kbused: PropTypes.number,
        kbtotal: PropTypes.number,
        free: PropTypes.string,
        used: PropTypes.string,
        total: PropTypes.string,
        percentUsed: PropTypes.number
    }).isRequired
}
DiscIO.defaultProps = {
    isRow: false
}

export default DiscIO