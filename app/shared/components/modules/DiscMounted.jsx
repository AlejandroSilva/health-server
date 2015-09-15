import React from 'react'

export default class DiscMounted extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
               <h3>Disc Mounted</h3>
                {this.props.data.map((mount)=>{
                    return(
                        <div key={mount.FILESYSTEM}>
                            <p>{mount.FILESYSTEM}</p>
                            <p>{mount.MBfsfree} <small>MBfsfree</small></p>
                            <p>{mount.MBfsused} <small>MBfsused</small></p>
                        </div>
                    )
                })}
            </div>
        )
    }
}