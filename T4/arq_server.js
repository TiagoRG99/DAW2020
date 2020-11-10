var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url)
    var arq_length = 122
    var url_split = req.url.split("/")
    var num = url_split[url_split.length - 1]
    if(req.url.length==1){
        var filename = 'arqsite/index.html'
        fs.readFile(filename, function (err, data) {
            if (err) {
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write("<p>Ficheiro inexistente.</p>")
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            }
        })
    }
    else if  ( req.url.match(/\/arqs\/[1-9][0-9]?[0-9]?$/) && parseInt(num) <= arq_length) {
        var filename = 'arqsite/arq' + num + '.html'
        fs.readFile(filename, function (err, data) {
            if (err) {
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write("<p>Ficheiro inexistente.</p>")
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            }
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<p>O URL não corresponde ao esperado.</p>")
        res.end()
    }
}).listen(7777);
console.log('Servidor à espera no porto 7777')