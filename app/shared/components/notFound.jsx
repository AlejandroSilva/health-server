import React from 'react'

class NotFound extends React.Component{
    render(){
        return (
            <div>
                <h1>404, route not found</h1>
                {this.props.children}
            </div>
        )
    }
}
export default NotFound