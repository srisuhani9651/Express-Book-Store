const fs = require("fs")
exports.logger = function(req,res, next){
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`
    //Here, I create a log message. It contains the current timestamp, the HTTP method like GET or POST, and the requested URL path.
    fs.appendFileSync('logs.txt', log,'utf-8')
    next()
}