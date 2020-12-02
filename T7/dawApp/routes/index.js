var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

function convert( tpc ) {
  if (tpc == "on"){
    return 1;
  }else {
    return 0;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/register', function (req, res) {
  res.render('student_register');
});

router.post('/students', function(req, res) {
  // Data retrieve
  Student.insert({numero: req.body.number, nome: req.body.name, git: req.body.git, tpc: [convert(req.body.tpc1),convert(req.body.tpc2),
    convert(req.body.tpc3),convert(req.body.tpc4),convert(req.body.tpc5),convert(req.body.tpc6),
    convert(req.body.tpc7),convert(req.body.tpc8)]})
    .then(res.redirect('/students'))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('student', { Student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/edit/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('student_edit', { Student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.post('/students/update', function(req, res) {
  Student.update({numero: req.body.number, nome: req.body.name, git: req.body.git, tpc: [convert(req.body.tpc1),convert(req.body.tpc2),
    convert(req.body.tpc3),convert(req.body.tpc4),convert(req.body.tpc5),convert(req.body.tpc6),
    convert(req.body.tpc7),convert(req.body.tpc8)]})
    .then(res.redirect('/students'))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/delete/:id', function(req, res) {
  // Data retrieve
  Student.delete(req.params.id)
    .then(res.redirect('/students'))
    .catch(err => res.render('error', {error: err}))
  ;
});

module.exports = router;
