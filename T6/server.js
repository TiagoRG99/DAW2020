var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static')

var { parse } = require('querystring')

// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}
// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm(task, d) {
    return `
    <html>
    <head>
        <title>POST receipt: ${task.what}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Task ${task.what} inserido</h1>    
            </header>

            <footer class="w3-container w3-teal">
                <address> Gerado por galuno::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}
// Task List Template Page ------------------
function geraTasksTable(tasks, state) {
    let pagHTML = `
            <div class="w3-container w3-teal">
                <h2>${state} Task List</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Date Created</th>
                    <th>Date Dued</th>
                    <th>Who</th>
                    <th>What</th>
                    <th>Type</th>
                </tr>
  `
    if (state == "To Do") {
        tasks.forEach(t => {
            if (t.state == "toDo") {
                pagHTML += `
                <tr>
                    <td>${t.dateCreated}</td>
                    <td>${t.dateDued}</td>
                    <td>${t.who}</td>
                    <td>${t.what}</td>
                    <td>${t.type}</td>
                </tr>
            `
            }
        })
    } else {
        tasks.forEach(t => {
            if (t.state == "resolved") {
                pagHTML += `
                <tr>
                    <td>${t.dateCreated}</td>
                    <td>${t.dateDued}</td>
                    <td>${t.who}</td>
                    <td>${t.what}</td>
                    <td>${t.type}</td>
                </tr>
            `
            }
        })
    }
    pagHTML += `
        </table>
  `
    return pagHTML
}

function MainPage(tasks, d) {
    return `
    <html>
        <head>
            <title>Registo de um aluno</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>

            ${geraFormTask()}

            ${geraTasksTable(tasks, "To Do")}

            ${geraTasksTable(tasks, "Resolved")}

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::DAW2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}
// Template para a página de aluno -------------------------------------
function geraPagAluno(aluno, d) {
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Número: </b> ${aluno.id}</li>
                    <li><b>Curso: </b> ${aluno.curso}</li>
                    <li><b>Git (link): </b> <a href="${aluno.git}">${aluno.git}</a></li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}
// Template para o formulário de aluno ------------------
function geraFormTask() {
    return `
            <div class="w3-container w3-teal">
                <h2>Add New Task</h2>
            </div>

            <form class="w3-container" action="/tasks" method="POST">
                <label class="w3-text-teal"><b>Date Created</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dateCreated">
          
                <label class="w3-text-teal"><b>Date Dued</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dateDued">

                <label class="w3-text-teal"><b>Who</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who">

                <label class="w3-text-teal"><b>What</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="what">

                <label class="w3-text-teal"><b>Type</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type">
          
                <input type="hidden" name="state" value="toDo">
                <input class="w3-btn w3-blue-grey" type="submit" value="Add"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Reset"/>
            </form>
    `
}

// Criação do servidor
var taskLServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    } else {
        switch (req.method) {
            case "GET":
                // GET /tasks --------------------------------------------------------------------
                if ((req.url == "/") || (req.url == "/tasks")) {
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(MainPage(tasks, d))
                            res.end()
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de alunos...")
                            res.end()
                        })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if (req.url == '/tasks') {
                    recuperaInfo(req, resultado => {
                        console.log('POST de task:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tasks', resultado)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write(geraPostConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                } else if (req.url == '/tasks/edit') {
                    recuperaInfo(req, resultado => {
                        console.log('PUT de task:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/tasks/' + resultado.id, resultado)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write(geraPostConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no PUT: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<p>Recebi um POST não suportado.</p>')
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

taskLServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')