class OnlineCourseManagementSystem {
  constructor() {
    this.students = [];
    this.instructors = [];
    this.courses = [];
    this.enrollments = [];
    this.assignments = [];
    this.certificates = [];
    this.currentStudentId = 1;
    this.currentInstructorId = 1;
    this.currentCourseId = 1;
    this.currentEnrollmentId = 1;
    this.currentAssignmentId = 1;
    this.currentCertificateId = 1;
  }

  // Methods for Students
  addStudent(name, email) {
    const newStudent = {
      id: this.currentStudentId++,
      name: name,
      email: email,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  removeStudent(id) {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      return this.students.splice(index, 1)[0];
    } else {
      throw new Error("Student not found");
    }
  }

  // Methods for Instructors
  addInstructor(name, email) {
    const newInstructor = {
      id: this.currentInstructorId++,
      name: name,
      email: email,
    };
    this.instructors.push(newInstructor);
    return newInstructor;
  }

  removeInstructor(id) {
    const index = this.instructors.findIndex(
      (instructor) => instructor.id === id
    );
    if (index !== -1) {
      return this.instructors.splice(index, 1)[0];
    } else {
      throw new Error("Instructor not found");
    }
  }

  // Methods for Courses
  addCourse(title, description) {
    const newCourse = {
      id: this.currentCourseId++,
      title: title,
      description: description,
      instructorId: null,
      students: [],
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  assignInstructorToCourse(courseId, instructorId) {
    const course = this.courses.find((course) => course.id === courseId);
    const instructor = this.instructors.find(
      (instructor) => instructor.id === instructorId
    );
    if (course && instructor) {
      course.instructorId = instructorId;
    } else {
      throw new Error("Course or Instructor not found");
    }
  }

  enrollStudentInCourse(courseId, studentId) {
    const course = this.courses.find((course) => course.id === courseId);
    const student = this.students.find((student) => student.id === studentId);
    if (course && student) {
      const enrollment = {
        id: this.currentEnrollmentId++,
        courseId: courseId,
        studentId: studentId,
        grade: null,
      };
      this.enrollments.push(enrollment);
      course.students.push(studentId);
    } else {
      throw new Error("Course or Student not found");
    }
  }

  gradeAssignment(assignmentId, grade) {
    const assignment = this.assignments.find(
      (assignment) => assignment.id === assignmentId
    );
    if (assignment) {
      assignment.grade = grade;
      const enrollment = this.enrollments.find(
        (enrollment) =>
          enrollment.courseId === assignment.courseId &&
          enrollment.studentId === assignment.studentId
      );
      if (enrollment) {
        enrollment.grade = this.calculateFinalGrade(
          enrollment.studentId,
          enrollment.courseId
        );
      }
    } else {
      throw new Error("Assignment not found");
    }
  }

  calculateFinalGrade(studentId, courseId) {
    const studentAssignments = this.assignments.filter(
      (assignment) =>
        assignment.studentId === studentId && assignment.courseId === courseId
    );
    const totalGrades = studentAssignments.reduce(
      (sum, assignment) => sum + assignment.grade,
      0
    );
    return totalGrades / studentAssignments.length;
  }

  generateCertificate(studentId, courseId) {
    const course = this.courses.find((course) => course.id === courseId);
    const student = this.students.find((student) => student.id === studentId);
    const enrollment = this.enrollments.find(
      (enrollment) =>
        enrollment.courseId === courseId && enrollment.studentId === studentId
    );
    if (course && student && enrollment && enrollment.grade >= 50) {
      const certificate = {
        id: this.currentCertificateId++,
        studentId: studentId,
        courseId: courseId,
        date: new Date(),
        grade: enrollment.grade,
      };
      this.certificates.push(certificate);
      return certificate;
    } else {
      throw new Error("Course, Student not found, or Student did not pass");
    }
  }

  // Methods for Assignments
  addAssignment(courseId, studentId, title, dueDate) {
    const course = this.courses.find((course) => course.id === courseId);
    const student = this.students.find((student) => student.id === studentId);
    if (course && student) {
      const newAssignment = {
        id: this.currentAssignmentId++,
        courseId: courseId,
        studentId: studentId,
        title: title,
        dueDate: dueDate,
        grade: null,
      };
      this.assignments.push(newAssignment);
      return newAssignment;
    } else {
      throw new Error("Course or Student not found");
    }
  }

  listCourses() {
    return this.courses;
  }

  listStudents() {
    return this.students;
  }

  listInstructors() {
    return this.instructors;
  }

  listEnrollments() {
    return this.enrollments;
  }

  listAssignments() {
    return this.assignments;
  }

  listCertificates() {
    return this.certificates;
  }
}

// Example usage
const ocms = new OnlineCourseManagementSystem();
const student1 = ocms.addStudent("Alice", "alice@example.com");
const student2 = ocms.addStudent("Bob", "bob@example.com");
const instructor1 = ocms.addInstructor("Dr. Smith", "smith@example.com");
const course1 = ocms.addCourse("JavaScript 101", "Introduction to JavaScript");
ocms.assignInstructorToCourse(course1.id, instructor1.id);
ocms.enrollStudentInCourse(course1.id, student1.id);
ocms.enrollStudentInCourse(course1.id, student2.id);
const assignment1 = ocms.addAssignment(
  course1.id,
  student1.id,
  "Homework 1",
  "2024-07-10"
);
ocms.gradeAssignment(assignment1.id, 95);
const assignment2 = ocms.addAssignment(
  course1.id,
  student2.id,
  "Homework 1",
  "2024-07-10"
);
ocms.gradeAssignment(assignment2.id, 85);
const certificate = ocms.generateCertificate(student1.id, course1.id);
console.log("Certificates:", ocms.listCertificates());
