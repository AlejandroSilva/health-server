import React from 'react'

export default class NetIO extends React.Component{
    constructor(){
        super()
    }
    render(){
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