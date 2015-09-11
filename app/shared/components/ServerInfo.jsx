import React from 'react'
import {Link} from 'react-router'
export default class ServerInfo extends React.Component{
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount(){
        //console.log("mount", this.props.params)
        this.fetchData();
    }
    componentWillReceiveProps(){
        //console.log("receive props", this.props.params)
        this.fetchData();
    }
    fetchData(){
        $.ajax({
            type: 'GET',
            url: `/v1/server/${this.props.params.serverId}`,
            success: (server)=>{
                console.log(server)
                this.setState({
                    server: server
                })
            },
            error: (xhr, type, err)=>{
                console.error("ajax error")
            }
        })
    }
    render(){
        if(!this.state.server){
            return <h1>loading</h1>
        }
        return(
            <div>
                <h1>this is the information of { this.state.server.name }</h1>
                {Object.getOwnPropertyNames(this.state.server.currentData).map((module)=>{
                    return <h3>{module}</h3>
                })}
            </div>
        )
    }
}
