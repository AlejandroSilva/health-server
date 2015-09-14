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
                    // algunos valores son fracciones con mucha precision, estos valores no son necesarios y son redondeados
                    available.avg = Math.floor(available.avg)
                    available.min = Math.floor(available.min)
                    available.max = Math.floor(available.max)
                    available.results = available.results.map((result)=>{
                        result.time = Math.floor(result.time)
                        return result
                    })
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