import React, { PropTypes } from 'react'

class NetIO extends React.Component{
    constructor(){
        super()
    }
    render(){
        if(this.props.isRow){
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <h4 className="box-title">Intrerfaces</h4>
                        <p className='pull-right' style={{margin: 0}}>asd</p>
                    </div>
                    <div className="box-body" style={{paddingTop: '0px', paddingBottom: '3px'}}>
                        <table className='table table-condensed'>
                            <thead><tr>
                                <th style={{paddingTop: 0, paddingBottom: 0}}>Int</th>
                                <th style={{paddingTop: 0, paddingBottom: 0}}>TX</th>
                                <th style={{paddingTop: 0, paddingBottom: 0}}>RX</th>
                            </tr></thead>
                            <tbody>
                                {this.props.data.map((int, index)=>
                                    <tr key={index}>
                                        <td style={{paddingTop: 0, paddingBottom: 0}}>{int.interface}</td>
                                        <td style={{paddingTop: 0, paddingBottom: 0}}>{int.RXbitrate}</td>
                                        <td style={{paddingTop: 0, paddingBottom: 0}}>{int.TXbitrate}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                   <h3>NetIO</h3>
                    {this.props.data.map((int)=>{
                        return (
                            <div key={int.interface}>
                                <p>{int.interface}</p>
                                <p>{int.rxkBps} <small>rxkBps</small></p>
                                <p>{int.txkBps} <small>txkBps</small></p>
                            </div>
                        )
                    })}

                </div>
            )
        }
    }
}
NetIO.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            RXbitrate: PropTypes.string,
            TXbitrate: PropTypes.string,
            RXpkts: PropTypes.number,
            TXpkts: PropTypes.number,
            RXbytes: PropTypes.number,
            TXbytes: PropTypes.number,
            address: PropTypes.string,
            interface: PropTypes.string,
            time: PropTypes.number
        }).isRequired
    ),
    isRow: PropTypes.bool
}
NetIO.defaultProps = {
    isRow: false
}

export default NetIO