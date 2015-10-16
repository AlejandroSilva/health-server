// React
import React, { PropTypes } from 'react'

class DiscIO extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentUsed>80? (this.props.data.percentUsed>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h3 className="box-title">Memoria</h3>
                    </div>
                    <div className="box-body">
                        <p>Usado: <b>{this.props.data.used}</b>    Libre: <b>{this.props.data.free}</b>    Total: <b>{this.props.data.used}</b></p>
                        <div className="progress progress-xs active" style={{margin: 0}}>
                            <div className={'progress-bar progress-xs '+barColor} style={{width: this.props.data.percentUsed+'%'}}></div>
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