import Server from '../../../db/Server.js';

// GET /v1/server/
export function getAllServers(req, res){
    Server.findAll()
        .then((servers)=>{
            res.json(servers);
        })
        .catch((err)=>{
            res.status(500).json({
                error: err
            });
        })
}

// POST /v1/server/
export function createServer(req, res){
    let newServer = new Server(req.body);
    console.log(req.body);
    if( newServer.isValid() ){
        newServer.save()
            .then((data)=>{
                res.json(newServer);
            })
            .catch((err)=>{
                res.json(err);
            })
    }else{
        res.status(400).json({
            error: 'invalid params'
        })
    }
}

// GET /v1/server/:serverId
export function getServer(req, res){
    res.status(501).json(req.server);
}

export function updateServer(req, res){
    res.status(501).send('update server')
}

export function deleteServer(req, res){
    res.status(501).send('delete server')
}