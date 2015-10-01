// React
import React from 'react'

class ServerView extends React.Component {
    render() {
        return (
            <div>
                <section className="content-header">
                    <h2>Servidor 1</h2>
                </section>
                <section className="content">
                    {/*this.props.servers.list.map((server, index)=> {
                        return <p key={index}>{server.host}</p>
                    })*/}
                    <p>cpu</p>
                    <p>mem</p>
                    <p>IO</p>
                    <p>....</p>
                </section>
            </div>
        );
    }
}
export default ServerView