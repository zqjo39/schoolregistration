const {Course, Student, StudentCourses} = require('../models');
const departments = ['Math', 'English', 'Music', 'Art', 'PE', 'World Languages', 'Social Studies', 'Science', 'Other'].sort();

// view all
module.exports.viewAll = async function (req, res) {
    const courses = await Course.findAll();
    res.render('course/view_all', {courses});
};

// profile
module.exports.viewProfile = async function(req, res) {
    const course = await Course.findByPk(req.params.id, {
        include: 'students'
    });
    const students = await Student.findAll();
    let availableStudents = [];
    for (let i = 0; i < students.length; i++) {
        if (!courseHasStudent(course, students[i])) {
            availableStudents.push(students[i])
        }
    }
    res.render('course/profile', {course, availableStudents});
};

// render add form
module.exports.renderAddForm = function(req, res) {
    const course = {
        name: '',
        department: departments[0],
        instructor_name: '',
        description: ''
    };
    res.render('course/add', {course, departments});
};

// add
module.exports.addCourse = async function(req, res) {
    const course = await Course.create({
        name: req.body.name,
        department: req.body.department,
        instructor_name: req.body.instructor_name,
        description: req.body.description
    });
    res.redirect(`/courses/profile/${course.id}`);
};

// render edit form
module.exports.renderEditForm = async function(req, res) {
    const course = await Course.findByPk(req.params.id);
    res.render('course/edit', {course, departments});
};

// update
module.exports.updateCourse = async function(req, res) {
    const course = await Course.update({
        name: req.body.name,
        department: req.body.department,
        instructor_name: req.body.instructor_name,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/courses/profile/${req.params.id}`);
};

// delete
module.exports.deleteCourse = async function(req, res) {
    await Course.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/courses');
};

// add student to course
module.exports.enrollStudent = async function(req, res) {
    await StudentCourses.create({
        student_id: req.body.student,
        course_id: req.params.courseId
    });
    res.redirect(`/courses/profile/${req.params.courseId}`)
}

// remove student from course
module.exports.removeStudent = async function(req, res) {
    await StudentCourses.destroy({
        where: {
            course_id: req.params.courseId,
            student_id: req.params.studentId

        }
    });
    res.redirect(`/courses/profile/${req.params.courseId}`);
}

function courseHasStudent(course, student) {
    for (let i = 0; i < course.students.length; i++) {
        if (student.id === course.students[i].id) {
            return true
        }
    }
    return false
}