
function rethinkErrors(err, req, res, next){
    next(err);
}

function thinkyErrors(err, req, res, next) {
    console.log("thinky error");
    if( /The query did not find a document/.test(err.message) ){
        res.status(404).json({
            message: 'Document not found',
            original: err
        })
    }else{
        next(err)
    }
}

function unhandledError(err, req, res, next){
    res.status(500).json({
        message: 'Unhandled error',
        original: err
    });
};

export default [rethinkErrors, thinkyErrors, unhandledError];