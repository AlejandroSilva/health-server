import tcpp from 'tcp-ping';

class Ping{
    constructor(config){
        this.config = config;
    }
    _test(host){
        return new Promise( (resolve, reject)=>{
            tcpp.ping({
                address: host,
                attempts: this.config.attempts
            }, function(err, available){
                if(err){
                    reject(err);
                }else{
                    resolve(available);
                }
            });
        })
    }
    testNational(){
        return this._test(this.config.nationalHost);
    }
    testIntrernational(){
        return this._test(this.config.internationalHost);
    }
    testCustom(host){
        return this._test(host);
    }
}

export default Ping;