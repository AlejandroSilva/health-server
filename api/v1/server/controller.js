import Server from '../../../db/Server.js'

export default {
    // GET /v1/server/
    getAllServers(req, res){
        Server.run()
            .then((servers)=>{
                res.json(servers);
            })
            .catch((err)=>{
                res.status(500).json({
                    error: err.message
                });
            })
    },

    // POST /v1/server/
    createServer(req, res){
        let newServer = new Server(req.body);
        // un usuario no puede agregar el id manualmente
        delete newServer.id;

        newServer.save()
            .then(function(result) {
                res.json(result);
            })
            .error((err)=>{
                res.status(500).json({
                    error: err.message
                })
            });
    },

    // GET /v1/server/:serverHost
    getServer(req, res){
        res.json(req.server);
    },

    // PUT /v1/server/:serverHost
    updateServer(req, res){
        req.server.host = req.body.host
        req.server.name = req.body.name
        req.server.port = req.body.port
        req.server.project = req.body.project
        req.server.save()
            .then(function(result) {
                res.status(200).json(result);
            })
            .error((err)=>{
                res.status(500).json({
                    error: err.message
                })
            });
    },

    // DELETE /v1/server/:serverHost
    deleteServer(req, res, next){
        req.server.delete()
            .then((result)=>{
                //res.json(result);
                res.status(204).send();
            })
            .catch(next);
    }
}