// React
import React, { PropTypes } from 'react'

// Components
import {
    Box, BoxHeader, BoxBody
} from '../ui/index.js'

class DiscIO extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentUsed>80? (this.props.data.percentUsed>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            const percentFree = Math.round(this.props.data.kbfree*100/this.props.data.kbtotal)
            const percentUsed = 100-percentFree
            return (
                <Box>
                    <BoxHeader>
                        <h4 className="box-title">Memoria</h4>
                        <p className='pull-right' style={{margin: 0}}>Total: {this.props.data.used}</p>
                    </BoxHeader>
                    <BoxBody>
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
                    </BoxBody>
                </Box>
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