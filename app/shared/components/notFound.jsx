import React from 'react'

export default class Error404 extends React.Component{
    render(){
        return (
            <div>
                <h1>404, route not found</h1>
                {this.props.children}
            </div>
        )
    }
}