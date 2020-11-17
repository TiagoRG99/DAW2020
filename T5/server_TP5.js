var http = require('http');
var axios = require('axios');
const { rawListeners } = require('process');

http.createServer(function (req, res) {
    console.log(req.method + '' + req.url)
    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        } else if (req.url == '/alunos') {
            axios.get('http://localhost:3000/alunos')
                .then(function (resp) {
                    alunos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : Lista de Alunos</h2>')
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write('<li><a href="/alunos/' + a.id + '">' + a.id + ' - ' + a.nome + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url.match(/\/alunos\/AE-[0-9][0-9][0-9]$/)) {
            axios.get('http://localhost:3000' + req.url)
                .then(function (resp) {
                    aluno = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : ' + aluno.nome + ' </h2>')
                    res.write('<ul>')
                    res.write('<li> ID: ' + aluno.id + '</li>')
                    res.write('<li> Nome: ' + aluno.nome + '</li>')
                    res.write('<li> Data Nascimento: ' + aluno.dataNasc + '</li>')
                    res.write('<li> Curso: ' + aluno.curso + '</li>')
                    res.write('<li> Ano do Curso: ' + aluno.anoCurso + '</li>')
                    res.write('<li> Instrumento: ' + aluno.instrumento + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/alunos">Voltar à Lista dos Alunos</a>]</address>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url.match(/\/alunos\/A[0-9][0-9][0-9][0-9][0-9]?$/)) {
            axios.get('http://localhost:3000' + req.url)
                .then(function (resp) {
                    aluno = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : ' + aluno.nome + '</h2>')
                    res.write('<ul>')
                    res.write('<li> ID: ' + aluno.id + '</li>')
                    res.write('<li> Nome: ' + aluno.nome + '</li>')
                    res.write('<li> Data Nascimento: ' + aluno.dataNasc + '</li>')
                    res.write('<li> Curso: ' + aluno.curso + '</li>')
                    res.write('<li> Ano do Curso: ' + aluno.anoCurso + '</li>')
                    res.write('<li> Instrumento: ' + aluno.instrumento + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/alunos">Voltar à Lista dos Alunos</a>]</address>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url == '/cursos') {
            axios.get('http://localhost:3000/cursos')
                .then(function (resp) {
                    cursos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : Lista de Cursos</h2>')
                    res.write('<ul>')
                    cursos.forEach(c => {
                        res.write('<li><a href="/cursos/' + c.id + '">' + c.id + ' - ' + c.designacao + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url.match(/\/cursos\/C[A-Z][0-9][0-9]?[0-9]?[0-9]?$/)) {
            axios.get('http://localhost:3000' + req.url)
                .then(function (resp) {
                    curso = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : ' + curso.designacao + '</h2>')
                    res.write('<ul>')
                    res.write('<li> ID: ' + curso.id + '</li>')
                    res.write('<li> Nome: ' + curso.designacao + '</li>')
                    res.write('<li> Duração: ' + curso.duracao + '</li>')
                    res.write('<li> Instrumento: <a href="/instrumentos/' + curso.instrumento.id + '">' + curso.instrumento["#text"] + '</a></li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/cursos">Voltar à Lista dos Cursos</a>]</address>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url == '/instrumentos') {
            axios.get('http://localhost:3000/instrumentos')
                .then(function (resp) {
                    instrumentos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : Lista de Instrumentos</h2>')
                    res.write('<ul>')
                    instrumentos.forEach(i => {
                        res.write('<li><a href="/instrumentos/' + i.id + '">' + i.id + ' - ' + i["#text"] + '</a></li>')
                    });
                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else if (req.url.match(/\/instrumentos\/I[0-9][0-9]?[0-9]?[0-9]?$/)) {
            axios.get('http://localhost:3000' + req.url)
                .then(function (resp) {
                    instr = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">')
                    res.write('<h2>Escola de Música : ' + instr["#text"] + '</h2>')
                    res.write('<ul>')
                    res.write('<li> ID: ' + instr.id + '</li>')
                    res.write('<li> Instrumento: ' + instr["#text"] + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/instrumentos">Voltar à Lista dos Instrumentos</a>]</address>')
                    res.write('<address>[<a href="/">Voltar à Página Principal</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log("Erro na obtenção da lista de alunos:" + error);
                });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
}).listen(4000);
console.log('Servidor à espera no porto 4000')