var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentController = require('../controllers/studentController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// courses

router.get('/courses', courseController.viewAll);

router.get('/courses/profile/:id', courseController.viewProfile);

router.get('/courses/edit/:id', courseController.renderEditForm);

router.post('/courses/edit/:id', courseController.updateCourse);

router.get('/courses/add', courseController.renderAddForm);

router.post('/courses/add', courseController.addCourse);

router.get('/courses/delete/:id', courseController.deleteCourse);

// students

router.get('/students', studentController.viewAll);

router.get('/students/profile/:id', studentController.viewProfile);

router.get('/students/edit/:id', studentController.renderEditForm);

router.post('/students/edit/:id', studentController.updateStudent);

router.get('/students/add', studentController.renderAddForm);

router.post('/students/add', studentController.addStudent);

router.get('/students/delete/:id', studentController.deleteStudent);

module.exports = router;
