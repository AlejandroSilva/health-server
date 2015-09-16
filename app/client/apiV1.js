import request from 'superagent'


export let server = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{
            request
                .get(`/v1/server`)
                .set('Content-Type', 'application/json')
                .set('token', '12345')
                .end((err, res)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        resolve(res.body)
                    }
                })
        })
    },
    get: (serverId)=>{
        return new Promise((resolve, reject)=>{
            request
                .get(`/v1/server/${serverId}`)
                .set('Content-Type', 'application/json')
                .set('token', '12345')
                .end((err, res)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        resolve(res.body)
                    }
                })
        })
    },
    create: (server)=>{
        return new Promise((resolve, reject)=>{
            request
                .post('/v1/server')
                .set('Content-Type', 'application/json')
                .set('token', '12345')
                .send(server)
                .end((err, res)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        resolve(res)
                    }
                })
        })
    },
    update: (server)=>{
        return new Promise((resolve, reject)=>{
            request
                .put(`/v1/server/${server.id}`)
                .set('Content-Type', 'application/json')
                .set('token', '12345')
                .send(server)
                .end((err, res)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        resolve(res)
                    }
                })
        })
    },
    delete: (serverId)=>{
        return new Promise((resolve, reject)=>{
            request
                .del(`/v1/server/${serverId}`)
                .set('Content-Type', 'application/json')
                .set('token', '12345')
                .send(server)
                .end((err, res)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        resolve(res)
                    }
                })
        })
    },
}
