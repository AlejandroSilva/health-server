// React
import React, { PropTypes } from 'react'

// Components
import {
    Box, BoxHeader, BoxBody
} from '../ui/index.js'
import {
    COLORS, Bar
} from '../Charts'


class DiscMounted extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected: {}
        }
    }
    show(disc){
        this.setState({
            selected: disc
        })
    }
    hide(){
        this.setState({
            selected: {}
        })
    }
    render(){
        const width = 200
        const height = 90
        const columnsCount = this.props.data.length
        const columnWidth = width/columnsCount

        if(this.props.isRow===true){
            return (
                <Box>
                    <BoxHeader>
                        <i className="fa fa-warning"></i>
                        <h3 className="box-title">{this.props.boxHeader}</h3>
                    </BoxHeader>
                    <BoxBody>
                        <svg width={width} height={height}>
                            {this.props.data.map((disc, columnIndex)=>{
                                const barColor = disc.percentUsed>80? (disc.percentUsed>90? COLORS.red:COLORS.orange): COLORS.green
                                return (
                                    <Bar
                                        key={columnIndex}
                                        width={columnWidth}
                                        height={height}
                                        value={disc.percentUsed}
                                        x={columnWidth*columnIndex}
                                        y={0}
                                        color={barColor}
                                        onMouseEnter={ this.show.bind(this, disc) }
                                        onMouseLeave={ this.hide.bind(this) }
                                    />
                                )
                            })}
                        </svg>
                        {/* Cuando se pasa el mouse sobre un elemento, mostrar esto: */}
                        {this.state.selected.mount?
                            <div className='box-footer' style={{paddingTop: 0, paddingBottom: 0}}>
                                <p style={{margin: 0}}>{this.state.selected.mount}</p>
                                <p style={{margin: 0}}>{this.state.selected.free} libres de {this.state.selected.total} </p>
                            </div>
                        : <div></div>}

                    </BoxBody>
                </Box>
            )
        }
        else{
            return (
                <div className="box box-solid">
                    <div className="box-header with-border" style={{paddingTop: 0, paddingBottom: 0}}>
                        <i className="fa fa-warning"></i>
                        <h3 className="box-title">Discos</h3>
                    </div>
                    <div className="box-body">
                        {this.props.data.map((disc, index)=>{
                            const barColor = disc.percentUsed>80? (disc.percentUsed>90? 'progress-bar-danger':'progress-bar-warning'): 'progress-bar-success'
                            return(
                                <div key={index}>
                                    <p style={{margin: 0}}><small>{disc.mount}</small></p>
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