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
