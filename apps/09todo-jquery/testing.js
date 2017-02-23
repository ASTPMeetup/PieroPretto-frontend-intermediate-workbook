'use strict';

var classroom = {};

var jon = {
  'name': 'Jon',
  'instructor': 'Jon Woo',
  'grade': 75
}

var sally = {
  'name': 'Sally',
  'instructor': 'Jon Woo',
  'grade': 90
}

var addStudent = function(student) {
      classroom[student.name] = student;
      return classroom;
};

addStudent(jon);
addStudent(sally);

console.log(classroom);
