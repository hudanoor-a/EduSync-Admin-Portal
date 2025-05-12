// Mock data for testing and development

// Departments
export const mockDepartments = [
  { id: 1, name: 'Computer Science', code: 'CS' },
  { id: 2, name: 'Electrical Engineering', code: 'EE' },
  { id: 3, name: 'Business Administration', code: 'BA' },
  { id: 4, name: 'Mathematics', code: 'MATH' },
  { id: 5, name: 'Physics', code: 'PHYS' }
];

// Classes
export const mockClasses = [
  { id: 1, name: 'BS Computer Science', departmentId: 1 },
  { id: 2, name: 'BS Electrical Engineering', departmentId: 2 },
  { id: 3, name: 'BBA', departmentId: 3 },
  { id: 4, name: 'BS Mathematics', departmentId: 4 },
  { id: 5, name: 'BS Physics', departmentId: 5 },
  { id: 6, name: 'MS Computer Science', departmentId: 1 },
  { id: 7, name: 'MS Electrical Engineering', departmentId: 2 }
];

// Sections
export const mockSections = [
  { id: 1, name: 'A', classId: 1, room_no: 'R-101', advisorId: 1 },
  { id: 2, name: 'B', classId: 1, room_no: 'R-102', advisorId: 2 },
  { id: 3, name: 'A', classId: 2, room_no: 'R-201', advisorId: 3 },
  { id: 4, name: 'A', classId: 3, room_no: 'R-301', advisorId: 4 },
  { id: 5, name: 'A', classId: 4, room_no: 'R-401', advisorId: 5 },
  { id: 6, name: 'A', classId: 5, room_no: 'R-501', advisorId: 6 },
  { id: 7, name: 'A', classId: 6, room_no: 'R-601', advisorId: 7 },
  { id: 8, name: 'A', classId: 7, room_no: 'R-701', advisorId: 8 }
];

// Students
export const mockStudents = [
  { id: 1, name: 'Ali Raza', email: 'ali.raza@student.edusync.com', password_hash: 'hashed_password', departmentId: 1, classId: 1, sectionId: 1 },
  { id: 2, name: 'Sara Ahmed', email: 'sara.ahmed@student.edusync.com', password_hash: 'hashed_password', departmentId: 1, classId: 1, sectionId: 2 },
  { id: 3, name: 'Usman Khan', email: 'usman.khan@student.edusync.com', password_hash: 'hashed_password', departmentId: 2, classId: 2, sectionId: 3 },
  { id: 4, name: 'Aisha Malik', email: 'aisha.malik@student.edusync.com', password_hash: 'hashed_password', departmentId: 3, classId: 3, sectionId: 4 },
  { id: 5, name: 'Hamza Ali', email: 'hamza.ali@student.edusync.com', password_hash: 'hashed_password', departmentId: 4, classId: 4, sectionId: 5 },
  { id: 6, name: 'Zainab Fatima', email: 'zainab.fatima@student.edusync.com', password_hash: 'hashed_password', departmentId: 5, classId: 5, sectionId: 6 },
  { id: 7, name: 'Ibrahim Hassan', email: 'ibrahim.hassan@student.edusync.com', password_hash: 'hashed_password', departmentId: 1, classId: 6, sectionId: 7 },
  { id: 8, name: 'Noor Fatima', email: 'noor.fatima@student.edusync.com', password_hash: 'hashed_password', departmentId: 2, classId: 7, sectionId: 8 }
];

// Faculty
export const mockFaculty = [
  { id: 1, name: 'Dr. Asad Ali', email: 'asad.ali@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 1 },
  { id: 2, name: 'Prof. Sana Khan', email: 'sana.khan@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 1 },
  { id: 3, name: 'Dr. Imran Ahmed', email: 'imran.ahmed@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 2 },
  { id: 4, name: 'Prof. Ayesha Tariq', email: 'ayesha.tariq@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 3 },
  { id: 5, name: 'Dr. Bilal Hassan', email: 'bilal.hassan@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 4 },
  { id: 6, name: 'Prof. Fatima Zia', email: 'fatima.zia@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 5 },
  { id: 7, name: 'Dr. Hasan Raza', email: 'hasan.raza@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 1 },
  { id: 8, name: 'Prof. Saima Khalid', email: 'saima.khalid@faculty.edusync.com', password_hash: 'hashed_password', departmentId: 2 }
];

// Admin
export const mockAdmin = [
  { id: 1, name: 'Admin User', email: 'admin@edusync.com', password_hash: 'hashed_password', role: 'admin' }
];

// Courses
export const mockCourses = [
  { id: 1, name: 'Introduction to Programming', course_code: 'CS101', departmentId: 1, credit_hours: 3 },
  { id: 2, name: 'Data Structures', course_code: 'CS201', departmentId: 1, credit_hours: 4 },
  { id: 3, name: 'Algorithms', course_code: 'CS301', departmentId: 1, credit_hours: 3 },
  { id: 4, name: 'Database Systems', course_code: 'CS401', departmentId: 1, credit_hours: 3 },
  { id: 5, name: 'Electric Circuits', course_code: 'EE101', departmentId: 2, credit_hours: 4 },
  { id: 6, name: 'Signals and Systems', course_code: 'EE201', departmentId: 2, credit_hours: 3 },
  { id: 7, name: 'Principles of Management', course_code: 'BA101', departmentId: 3, credit_hours: 3 },
  { id: 8, name: 'Financial Accounting', course_code: 'BA201', departmentId: 3, credit_hours: 3 },
  { id: 9, name: 'Calculus I', course_code: 'MATH101', departmentId: 4, credit_hours: 3 },
  { id: 10, name: 'Linear Algebra', course_code: 'MATH201', departmentId: 4, credit_hours: 3 },
  { id: 11, name: 'Mechanics', course_code: 'PHYS101', departmentId: 5, credit_hours: 4 },
  { id: 12, name: 'Electromagnetism', course_code: 'PHYS201', departmentId: 5, credit_hours: 4 }
];

// Class Schedules
export const mockSchedules = [
  { id: 1, courseId: 1, facultyId: 1, classId: 1, sectionId: 1, day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:30:00' },
  { id: 2, courseId: 1, facultyId: 1, classId: 1, sectionId: 1, day_of_week: 'Wednesday', start_time: '09:00:00', end_time: '10:30:00' },
  { id: 3, courseId: 2, facultyId: 2, classId: 1, sectionId: 1, day_of_week: 'Tuesday', start_time: '11:00:00', end_time: '12:30:00' },
  { id: 4, courseId: 2, facultyId: 2, classId: 1, sectionId: 1, day_of_week: 'Thursday', start_time: '11:00:00', end_time: '12:30:00' },
  { id: 5, courseId: 5, facultyId: 3, classId: 2, sectionId: 3, day_of_week: 'Monday', start_time: '14:00:00', end_time: '15:30:00' },
  { id: 6, courseId: 6, facultyId: 3, classId: 2, sectionId: 3, day_of_week: 'Wednesday', start_time: '14:00:00', end_time: '15:30:00' },
  { id: 7, courseId: 7, facultyId: 4, classId: 3, sectionId: 4, day_of_week: 'Tuesday', start_time: '09:00:00', end_time: '10:30:00' },
  { id: 8, courseId: 9, facultyId: 5, classId: 4, sectionId: 5, day_of_week: 'Thursday', start_time: '09:00:00', end_time: '10:30:00' },
  { id: 9, courseId: 11, facultyId: 6, classId: 5, sectionId: 6, day_of_week: 'Friday', start_time: '11:00:00', end_time: '12:30:00' }
];

// Student Course Enrollments
export const mockEnrollments = [
  { id: 1, studentId: 1, courseId: 1, enrolled_at: '2023-08-15' },
  { id: 2, studentId: 1, courseId: 2, enrolled_at: '2023-08-15' },
  { id: 3, studentId: 2, courseId: 1, enrolled_at: '2023-08-16' },
  { id: 4, studentId: 2, courseId: 2, enrolled_at: '2023-08-16' },
  { id: 5, studentId: 3, courseId: 5, enrolled_at: '2023-08-15' },
  { id: 6, studentId: 3, courseId: 6, enrolled_at: '2023-08-15' },
  { id: 7, studentId: 4, courseId: 7, enrolled_at: '2023-08-17' },
  { id: 8, studentId: 5, courseId: 9, enrolled_at: '2023-08-18' },
  { id: 9, studentId: 6, courseId: 11, enrolled_at: '2023-08-16' }
];

// Attendance
export const mockAttendance = [
  { id: 1, studentId: 1, courseId: 1, date: '2023-09-04', status: 'Present' },
  { id: 2, studentId: 1, courseId: 1, date: '2023-09-06', status: 'Present' },
  { id: 3, studentId: 1, courseId: 1, date: '2023-09-11', status: 'Absent' },
  { id: 4, studentId: 1, courseId: 1, date: '2023-09-13', status: 'Present' },
  { id: 5, studentId: 1, courseId: 2, date: '2023-09-05', status: 'Present' },
  { id: 6, studentId: 1, courseId: 2, date: '2023-09-07', status: 'Late' },
  { id: 7, studentId: 2, courseId: 1, date: '2023-09-04', status: 'Present' },
  { id: 8, studentId: 2, courseId: 1, date: '2023-09-06', status: 'Absent' },
  { id: 9, studentId: 2, courseId: 1, date: '2023-09-11', status: 'Present' },
  { id: 10, studentId: 2, courseId: 1, date: '2023-09-13', status: 'Present' }
];

// Invoices
export const mockInvoices = [
  { id: 1, invoice_number: 'INV-2023-001', studentId: 1, amount: 25000, due_date: '2023-09-30', paid: true, generated_at: '2023-09-01' },
  { id: 2, invoice_number: 'INV-2023-002', studentId: 2, amount: 25000, due_date: '2023-09-30', paid: false, generated_at: '2023-09-01' },
  { id: 3, invoice_number: 'INV-2023-003', studentId: 3, amount: 30000, due_date: '2023-09-30', paid: true, generated_at: '2023-09-01' },
  { id: 4, invoice_number: 'INV-2023-004', studentId: 4, amount: 28000, due_date: '2023-09-30', paid: true, generated_at: '2023-09-01' },
  { id: 5, invoice_number: 'INV-2023-005', studentId: 5, amount: 25000, due_date: '2023-09-30', paid: false, generated_at: '2023-09-01' },
  { id: 6, invoice_number: 'INV-2023-006', studentId: 6, amount: 32000, due_date: '2023-09-30', paid: false, generated_at: '2023-09-01' },
  { id: 7, invoice_number: 'INV-2023-007', studentId: 7, amount: 35000, due_date: '2023-09-30', paid: true, generated_at: '2023-09-01' },
  { id: 8, invoice_number: 'INV-2023-008', studentId: 8, amount: 35000, due_date: '2023-09-30', paid: false, generated_at: '2023-09-01' }
];

// Events
export const mockEvents = [
  { id: 1, title: 'Orientation Day', description: 'Orientation for new students', event_date: '2023-09-01', created_by_admin: 1 },
  { id: 2, title: 'Faculty Meeting', description: 'Monthly faculty coordination meeting', event_date: '2023-09-15', created_by_admin: 1 },
  { id: 3, title: 'Annual Sports Day', description: 'Annual sports competition', event_date: '2023-10-20', created_by_admin: 1 },
  { id: 4, title: 'Midterm Exams', description: 'Midterm examinations for all departments', event_date: '2023-11-01', created_by_admin: 1 },
  { id: 5, title: 'Career Fair', description: 'Annual career fair with industry partners', event_date: '2023-12-05', created_by_admin: 1 }
];

// Event Audiences
export const mockEventAudiences = [
  { id: 1, eventId: 1, audience_type: 'student', audience_id: 0 },
  { id: 2, eventId: 2, audience_type: 'faculty', audience_id: 0 },
  { id: 3, eventId: 3, audience_type: 'all', audience_id: 0 },
  { id: 4, eventId: 4, audience_type: 'all', audience_id: 0 },
  { id: 5, eventId: 5, audience_type: 'class', audience_id: 1 }
];

// Messages
export const mockMessages = [
  { id: 1, sender_id: 1, sender_type: 'admin', receiver_id: 1, receiver_type: 'student', subject: 'Welcome to EduSync', body: 'Welcome to the new semester. We hope you have a great learning experience.', sent_at: '2023-08-30' },
  { id: 2, sender_id: 1, sender_type: 'admin', receiver_id: 1, receiver_type: 'faculty', subject: 'Faculty Meeting', body: 'Reminder about the faculty meeting scheduled for next week.', sent_at: '2023-09-10' },
  { id: 3, sender_id: 1, sender_type: 'student', receiver_id: 1, receiver_type: 'admin', subject: 'Fee Payment Query', body: 'I have a question regarding the fee payment deadline.', sent_at: '2023-09-12' },
  { id: 4, sender_id: 1, sender_type: 'faculty', receiver_id: 1, receiver_type: 'admin', subject: 'Leave Application', body: 'I need to apply for leave next week due to personal reasons.', sent_at: '2023-09-14' }
];

// Leave Requests
export const mockLeaveRequests = [
  { id: 1, facultyId: 1, departmentId: 1, classId: 1, sectionId: 1, courseId: 1, leave_date: '2023-09-18', reason: 'Medical appointment', status: 'Approved' },
  { id: 2, facultyId: 2, departmentId: 1, classId: 1, sectionId: 2, courseId: 2, leave_date: '2023-09-19', reason: 'Personal emergency', status: 'Pending' },
  { id: 3, facultyId: 3, departmentId: 2, classId: 2, sectionId: 3, courseId: 5, leave_date: '2023-09-20', reason: 'Conference attendance', status: 'Approved' },
  { id: 4, facultyId: 4, departmentId: 3, classId: 3, sectionId: 4, courseId: 7, leave_date: '2023-09-21', reason: 'Family event', status: 'Rejected' }
];

// Faculty Courses
export const mockFacultyCourses = [
  { id: 1, facultyId: 1, courseId: 1 },
  { id: 2, facultyId: 1, courseId: 3 },
  { id: 3, facultyId: 2, courseId: 2 },
  { id: 4, facultyId: 2, courseId: 4 },
  { id: 5, facultyId: 3, courseId: 5 },
  { id: 6, facultyId: 3, courseId: 6 },
  { id: 7, facultyId: 4, courseId: 7 },
  { id: 8, facultyId: 4, courseId: 8 },
  { id: 9, facultyId: 5, courseId: 9 },
  { id: 10, facultyId: 5, courseId: 10 }
];

// Course Class links
export const mockCourseClasses = [
  { id: 1, courseId: 1, classId: 1 },
  { id: 2, courseId: 2, classId: 1 },
  { id: 3, courseId: 3, classId: 1 },
  { id: 4, courseId: 4, classId: 1 },
  { id: 5, courseId: 5, classId: 2 },
  { id: 6, courseId: 6, classId: 2 },
  { id: 7, courseId: 7, classId: 3 },
  { id: 8, courseId: 8, classId: 3 },
  { id: 9, courseId: 9, classId: 4 },
  { id: 10, courseId: 10, classId: 4 }
];

// Course Section links
export const mockCourseSections = [
  { id: 1, courseClassId: 1, sectionId: 1, courseId: 1 },
  { id: 2, courseClassId: 1, sectionId: 2, courseId: 1 },
  { id: 3, courseClassId: 2, sectionId: 1, courseId: 2 },
  { id: 4, courseClassId: 2, sectionId: 2, courseId: 2 },
  { id: 5, courseClassId: 5, sectionId: 3, courseId: 5 },
  { id: 6, courseClassId: 6, sectionId: 3, courseId: 6 },
  { id: 7, courseClassId: 7, sectionId: 4, courseId: 7 },
  { id: 8, courseClassId: 8, sectionId: 4, courseId: 8 },
  { id: 9, courseClassId: 9, sectionId: 5, courseId: 9 },
  { id: 10, courseClassId: 10, sectionId: 5, courseId: 10 }
];

// Dashboard stat summary
export const mockDashboardStats = {
  students: {
    total: 250,
    increase: 5,
  },
  faculty: {
    total: 30,
    increase: 2,
  },
  courses: {
    total: 45,
    increase: 10,
  },
  events: {
    total: 8,
    increase: 0,
  }
};

// Attendance analytics data
export const mockAttendanceAnalytics = {
  student: {
    overall: {
      labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      present: [85, 82, 88, 90, 86, 92],
      absent: [10, 12, 8, 7, 10, 5],
      late: [5, 6, 4, 3, 4, 3]
    },
    departmentWise: {
      labels: ['CS', 'EE', 'BA', 'MATH', 'PHYS'],
      present: [90, 85, 80, 88, 82],
      absent: [7, 10, 15, 9, 12],
      late: [3, 5, 5, 3, 6]
    }
  },
  faculty: {
    overall: {
      labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      present: [95, 97, 94, 96, 98, 93],
      absent: [4, 2, 5, 3, 1, 6],
      late: [1, 1, 1, 1, 1, 1]
    },
    departmentWise: {
      labels: ['CS', 'EE', 'BA', 'MATH', 'PHYS'],
      present: [96, 94, 93, 97, 95],
      absent: [3, 5, 6, 2, 4],
      late: [1, 1, 1, 1, 1]
    }
  }
};

// Department-wise student distribution data
export const mockDepartmentDistribution = {
  labels: ['CS', 'EE', 'BA', 'MATH', 'PHYS'],
  data: [80, 65, 50, 35, 20]
};

// Faculty performance data
export const mockFacultyPerformance = {
  labels: ['Teaching Quality', 'Course Material', 'Student Interaction', 'Punctuality', 'Overall Rating'],
  datasets: [
    {
      label: 'Computer Science',
      data: [4.5, 4.3, 4.7, 4.6, 4.5],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
    {
      label: 'Electrical Engineering',
      data: [4.2, 4.0, 4.3, 4.5, 4.2],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
    }
  ]
};

// Monthly revenue data
export const mockRevenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [1500000, 1200000, 900000, 800000, 750000, 900000, 1300000, 2200000, 1800000, 1100000, 1000000, 1200000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
    }
  ]
};
