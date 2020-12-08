var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')

var upload = multer({ dest: 'uploads/' })

var app = express()


app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', function (req, res) {
    var d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req, res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files', upload.array('myFile'), function (req, res) {
    // multiple files: upload.array(...) => files is an array
    var i;
    for (i = 0; i < req.files.length; i++) {
        let oldPath = __dirname + '/' + req.files[i].path
        let newPath = __dirname + '/public/fileStore/' + req.files[i].originalname

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
        })
        var files = jsonfile.readFileSync('./dbFiles.json')
        var d = new Date().toISOString().substr(0, 16)

        if (req.files.length > 0) {
            var descri = req.body.desc[i]
        } else {
            var descri = req.body.desc
        }

        files.push(
            {
                date: d,
                name: req.files[i].originalname,
                size: req.files[i].size,
                mimetype: req.files[i].mimetype,
                desc: descri
            }
        )

        jsonfile.writeFileSync('./dbFiles.json', files)

    }
    res.redirect('/')
})

app.listen(7701, () => console.log('Servidor à escuta na porta 7701...'))