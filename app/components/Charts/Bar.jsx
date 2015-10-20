// React
import React, { PropTypes } from 'react'
// Colors
import { COLORS } from './index.js'

const padding = 2
class Bar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected: false
        }
    }
    onMouseEnter(){
        this.setState({selected:true})
    }
    onMouseLeave(){
        this.setState({selected:false})
    }
    render(){
        const {
            x, y, width:w, height:h,
            value, color
        } = this.props
        return(
            <svg width={w} height={h} x={this.props.x} y={this.props.y}
                 onMouseEnter={ ()=>{
                    this.onMouseEnter()
                    if(this.props.onMouseEnter) this.props.onMouseEnter()
                 } }
                 onMouseLeave={ ()=>{
                    this.onMouseLeave()
                    if(this.props.onMouseLeave) this.props.onMouseLeave()
                 } }
                >
                <rect width={w-2*padding} height={h} x={padding} y={0} fill={COLORS.grey}/>
                <rect
                    width={ this.state.selected? w: w-2*padding}
                    height={value}
                    x={ this.state.selected? 0: padding}
                    y={h-value}
                    fill={color}
                />
            </svg>
        )
    }
}
Bar.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}
Bar.defaultProps = {
    color: '#00a65a'
    //color: COLORS.green
}
export default  Bar