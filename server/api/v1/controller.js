'use strict';
import Sar from '../../../lib/SAR.js'
import Ping from '../../../lib/Ping.js'
import config from '../../../config/config.js';

let sar  = new Sar(config.lib.sar.interval, config.lib.sar.count);
let ping = new Ping(config.lib.ping);

export function cpuInfo (req, res){
    sar.cpu()
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}

export function ramInfo (req, res){
    sar.ram()
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}

export function spaceInfo (req, res){
    sar.discMounted()
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}

export function discIOInfo (req, res){
    sar.discIO()
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}
export function netIOInfo (req, res){
    sar.netIO()
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}

export function pingInfo(req, res){
    Promise.all([ping.testNational(), ping.testIntrernational()])
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}
export function pingCustom(req, res){
    ping.testCustom(req.params.pingHost)
        .then( (data)=>{
            res.json(data);
        })
        .catch( (err)=>{
            res.status(500).json(err);
        })
}