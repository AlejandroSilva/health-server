import React from 'react'

export default class AddServer extends React.Component{
    constructor(){
        super()
        this.sendForm = this.sendForm.bind(this)
    }

    sendForm(e){
        e.preventDefault();

        let data = {
            name: React.findDOMNode(this.refs.name).value,
            host: React.findDOMNode(this.refs.host).value,
            port: React.findDOMNode(this.refs.port).value,
            project: React.findDOMNode(this.refs.project).value
        }

        $.ajax({
            type: 'POST',
            url: '/v1/server',
            headers:{
                'token': 12345
            },
            data: data,
            success: (newServer)=>{
                console.log(newServer)
            },
            error: (xhr, type, err)=>{
                console.error("ajax error ", err)
            }
        })
    }
    render(){
        return (
            <form onSubmit={this.sendForm}>
                <input type="text"   ref="name" min="4" required placeholder="Nombre. Ej. CAO Biopacs"/>
                <input type="text"   ref="host" min="4" required placeholder="Host. Ej. cao.biopacs.com"/>
                <input type="number" ref="port" min="2" max="4" required placeholder="Port. Ej. 8080"/>
                <input type="text"   ref="project" required placeholder="Proyecto. Ej. Clinica Alemana Osorno"/>
                <input type="submit"/>
            </form>
        )
    }
}
