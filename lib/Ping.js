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
                    // la libreria
                    available.avg = Math.floor(available.avg)
                    available.min = Math.floor(available.min)
                    available.max = Math.floor(available.max)
                    available.successfullAttemps = 0
                    available.totalTimeSpent = available.results.reduce((result, currentAttempt)=>{
                        if(currentAttempt.err){
                            return result
                        }else{
                            successfullAttemps += 1
                            return result + currentAttempt.time
                        }
                    }, 0)
                    available.avg2 = Math.floor(available.totalTimeSpent/available.successfullAttemps)
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