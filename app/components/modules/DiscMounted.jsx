// React
import React, { PropTypes } from 'react'

class DiscMounted extends React.Component{
    render(){
        if(this.props.isRow===true){
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <i className="fa fa-warning"></i>
                        <h3 className="box-title">{this.props.boxHeader}</h3>
                    </div>
                    <div className="box-body">
                        {this.props.data.map((disc, index)=>{
                            const barColor = disc.percentUsed>80? (disc.percentUsed>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
                            return(
                                <div key={index}>
                                    <p style={{margin: 0}}><small>{disc.filesystem}</small></p>
                                    <div className='progress progress-xs active' style={{margin: 0}}>
                                        <div className={'progress-bar progress-bar-striped '+barColor} style={{width: disc.percentUsed+'%'}}></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                   <h3>Disc Mounted</h3>
                    {this.props.data.map((mount, index)=>{
                        return(
                            <div key={index}>
                                <p>{mount.filesystem}</p>
                                <p>{mount.free} <small>free</small></p>
                                <p>{mount.used} <small>used</small></p>
                                <p>{mount.total} <small>total</small></p>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}
DiscMounted.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
          filesystem: PropTypes.string,
          mount: PropTypes.string,
          free: PropTypes.string,
          total: PropTypes.string,
          used: PropTypes.string,
          percentUsed: PropTypes.number,
          blocksFree: PropTypes.number,
          blocksUsed: PropTypes.number,
          blocksTotal: PropTypes.number
      }).isRequired
    ),
    isRow: PropTypes.bool,
    boxHeader: PropTypes.string
}
DiscMounted.defaultProps = {
    isRow: false,
    boxHeader: ''
}

export default DiscMounted