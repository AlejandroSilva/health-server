import React from 'react'
import * as Api from './../../client/apiV1.js'

export default class AddServer extends React.Component{
    constructor(){
        super()
        this.state = {
            error: '',
            server: {
                id: '',
                name: '',
                host: '',
                port: '',
                project: ''
            }
        }
        this.sendForm = this.sendForm.bind(this)
    }

    sendForm(e){
        e.preventDefault();
        this.setState({error: ''})

        if(this.state.server.id){
            console.log('update2')
            Api.server.update(this.state.server)
                .then((server)=> this.setState({server: server}) )
                .catch((err)=> this.setState({error: err}) )
        }else{
            console.log('create2')
            Api.server.create(this.state.server)
                .then((server)=> this.setState({server: server}) )
                .catch((err)=> this.setState({error: err}) )
        }
    }
    handleChange(element, e){
        let server = this.state.server
        server[element] = e.target.value
        this.setState({
            error: '',
            server: server
        })
        console.log(this.state.server)
    }
    render(){
        let errorMessage = this.state.error? <p>{this.state.error}</p>: null;

        return (
            <form onSubmit={this.sendForm}>
                <input type="text"   value={this.state.server.id} disabled/>
                <input type="text"   value={this.state.server.name} onChange={this.handleChange.bind(this, 'name')} required placeholder="Nombre. Ej. CAO Biopacs"/>
                <input type="text"   value={this.state.server.host} onChange={this.handleChange.bind(this, 'host')} required placeholder="Host. Ej. cao.biopacs.com"/>
                <input type="number" value={this.state.server.port} onChange={this.handleChange.bind(this, 'port')} min="0" max="9999" required placeholder="Port. Ej. 8081"/>
                <input type="text"   value={this.state.server.project} onChange={this.handleChange.bind(this, 'project')} required placeholder="Proyecto. Ej. Clinica Alemana Osorno"/>
                <input type="submit" value={this.state.server.id? 'Actualizar': 'Crear'}/>
                {errorMessage}
            </form>
        )
    }
}
