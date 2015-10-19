import React, { PropTypes } from 'react'

class DICOM extends React.Component{
    render(){
        if(this.props.isRow===true){
            const barColor = this.props.data.percentIdle>80? (this.props.data.percentIdle>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h3 className="box-title">DICOM Echo</h3>
                    </div>
                    <div className="box-body" style={{paddingTop: '0px', paddingBottom: '3px'}}>
                        <p style={{margin: 0}}>Repuesta:
                            <span className='label label-success'>success</span>
                        </p>
                    </div>
                </div>
            )
        }
        else{
            return (
                <h3>vista larga no implementada</h3>
            )
        }
    }
}
DICOM.propTypes = {
    isRow: PropTypes.bool,
    data: PropTypes.shape({
        model: PropTypes.string,
        percentIdle: PropTypes.number,
        percentSys: PropTypes.number,
        percentUser: PropTypes.number,
        secMeasured: PropTypes.number,
        speed: PropTypes.number
    })
}
DICOM.defaultProps = {
    isRow: false
}

export default DICOM