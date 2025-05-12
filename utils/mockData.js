// Mock data for the EduSync system

// Departments
export const mockDepartments = [
  { id: 1, name: 'Science' },
  { id: 2, name: 'Commerce' },
  { id: 3, name: 'Arts' },
  { id: 4, name: 'Engineering' },
  { id: 5, name: 'Medicine' }
];

// Classes
export const mockClasses = [
  { id: 1, name: 'Class 9', departmentId: 1 },
  { id: 2, name: 'Class 10', departmentId: 1 },
  { id: 3, name: 'Class 11', departmentId: 1 },
  { id: 4, name: 'Class 9', departmentId: 2 },
  { id: 5, name: 'Class 10', departmentId: 2 },
  { id: 6, name: 'Class 11', departmentId: 2 },
  { id: 7, name: 'Class 9', departmentId: 3 },
  { id: 8, name: 'Class 10', departmentId: 3 },
  { id: 9, name: 'Class 11', departmentId: 3 },
  { id: 10, name: 'First Year', departmentId: 4 },
  { id: 11, name: 'Second Year', departmentId: 4 },
  { id: 12, name: 'First Year', departmentId: 5 },
  { id: 13, name: 'Second Year', departmentId: 5 }
];

// Sections
export const mockSections = [
  { id: 1, name: 'Section A', classId: 1 },
  { id: 2, name: 'Section B', classId: 1 },
  { id: 3, name: 'Section A', classId: 2 },
  { id: 4, name: 'Section B', classId: 2 },
  { id: 5, name: 'Section A', classId: 3 },
  { id: 6, name: 'Section B', classId: 3 },
  { id: 7, name: 'Section A', classId: 4 },
  { id: 8, name: 'Section B', classId: 4 },
  { id: 9, name: 'Section A', classId: 5 },
  { id: 10, name: 'Section B', classId: 5 },
  { id: 11, name: 'Section A', classId: 6 },
  { id: 12, name: 'Section B', classId: 6 },
  { id: 13, name: 'Section A', classId: 7 },
  { id: 14, name: 'Section B', classId: 7 },
  { id: 15, name: 'Section A', classId: 8 },
  { id: 16, name: 'Section B', classId: 8 },
  { id: 17, name: 'Section A', classId: 9 },
  { id: 18, name: 'Section B', classId: 9 },
  { id: 19, name: 'Section A', classId: 10 },
  { id: 20, name: 'Section B', classId: 10 },
  { id: 21, name: 'Section A', classId: 11 },
  { id: 22, name: 'Section B', classId: 11 },
  { id: 23, name: 'Section A', classId: 12 },
  { id: 24, name: 'Section B', classId: 12 },
  { id: 25, name: 'Section A', classId: 13 },
  { id: 26, name: 'Section B', classId: 13 }
];

// Students
export const mockStudents = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@edusync.edu', 
    phone: '9876543210', 
    gender: 'Male',
    departmentId: 1, 
    classId: 1, 
    sectionId: 1, 
    roll_number: 'SCN9A001',
    address: '123 Main St, Cityville',
    date_of_birth: '2005-05-15',
    parent_name: 'Robert Smith',
    parent_phone: '9876543200',
    admission_date: '2023-07-10',
    password_hash: 'hashed_password',
    created_at: '2023-07-10T10:00:00Z',
    updated_at: '2023-07-10T10:00:00Z'
  },
  { 
    id: 2, 
    name: 'Emma Wilson', 
    email: 'emma.wilson@edusync.edu', 
    phone: '9876543211', 
    gender: 'Female',
    departmentId: 1, 
    classId: 1, 
    sectionId: 1, 
    roll_number: 'SCN9A002',
    address: '456 Oak Ave, Townsville',
    date_of_birth: '2005-03-20',
    parent_name: 'David Wilson',
    parent_phone: '9876543201',
    admission_date: '2023-07-10',
    password_hash: 'hashed_password',
    created_at: '2023-07-10T10:15:00Z',
    updated_at: '2023-07-10T10:15:00Z'
  },
  { 
    id: 3, 
    name: 'Sara Johnson', 
    email: 'sara.johnson@edusync.edu', 
    phone: '9876543212', 
    gender: 'Female',
    departmentId: 1, 
    classId: 1, 
    sectionId: 2, 
    roll_number: 'SCN9B001',
    address: '789 Pine St, Villageton',
    date_of_birth: '2005-07-12',
    parent_name: 'Michael Johnson',
    parent_phone: '9876543202',
    admission_date: '2023-07-11',
    password_hash: 'hashed_password',
    created_at: '2023-07-11T09:30:00Z',
    updated_at: '2023-07-11T09:30:00Z'
  },
  { 
    id: 4, 
    name: 'Alex Thompson', 
    email: 'alex.thompson@edusync.edu', 
    phone: '9876543213', 
    gender: 'Male',
    departmentId: 2, 
    classId: 4, 
    sectionId: 7, 
    roll_number: 'COM9A001',
    address: '101 Cedar Ln, Hamletville',
    date_of_birth: '2005-11-08',
    parent_name: 'Jennifer Thompson',
    parent_phone: '9876543203',
    admission_date: '2023-07-11',
    password_hash: 'hashed_password',
    created_at: '2023-07-11T11:45:00Z',
    updated_at: '2023-07-11T11:45:00Z'
  },
  { 
    id: 5, 
    name: 'Peter Chang', 
    email: 'peter.chang@edusync.edu', 
    phone: '9876543214', 
    gender: 'Male',
    departmentId: 3, 
    classId: 7, 
    sectionId: 13, 
    roll_number: 'ART9A001',
    address: '202 Maple Rd, Boroughburg',
    date_of_birth: '2005-02-25',
    parent_name: 'Wei Chang',
    parent_phone: '9876543204',
    admission_date: '2023-07-12',
    password_hash: 'hashed_password',
    created_at: '2023-07-12T10:20:00Z',
    updated_at: '2023-07-12T10:20:00Z'
  },
  { 
    id: 6, 
    name: 'Maria Garcia', 
    email: 'maria.garcia@edusync.edu', 
    phone: '9876543215', 
    gender: 'Female',
    departmentId: 4, 
    classId: 10, 
    sectionId: 19, 
    roll_number: 'ENG1A001',
    address: '303 Birch Blvd, Metropolis',
    date_of_birth: '2004-09-17',
    parent_name: 'Carlos Garcia',
    parent_phone: '9876543205',
    admission_date: '2023-07-12',
    password_hash: 'hashed_password',
    created_at: '2023-07-12T14:10:00Z',
    updated_at: '2023-07-12T14:10:00Z'
  },
  { 
    id: 7, 
    name: 'James Wilson', 
    email: 'james.wilson@edusync.edu', 
    phone: '9876543216', 
    gender: 'Male',
    departmentId: 5, 
    classId: 12, 
    sectionId: 23, 
    roll_number: 'MED1A001',
    address: '404 Elm Ct, Suburbia',
    date_of_birth: '2004-04-30',
    parent_name: 'Thomas Wilson',
    parent_phone: '9876543206',
    admission_date: '2023-07-13',
    password_hash: 'hashed_password',
    created_at: '2023-07-13T09:15:00Z',
    updated_at: '2023-07-13T09:15:00Z'
  },
  { 
    id: 8, 
    name: 'Sophia Lee', 
    email: 'sophia.lee@edusync.edu', 
    phone: '9876543217', 
    gender: 'Female',
    departmentId: 5, 
    classId: 12, 
    sectionId: 23, 
    roll_number: 'MED1A002',
    address: '505 Spruce Way, Downtown',
    date_of_birth: '2004-06-11',
    parent_name: 'Henry Lee',
    parent_phone: '9876543207',
    admission_date: '2023-07-13',
    password_hash: 'hashed_password',
    created_at: '2023-07-13T11:30:00Z',
    updated_at: '2023-07-13T11:30:00Z'
  }
];

// Faculty
export const mockFaculty = [
  { 
    id: 1, 
    name: 'Dr. Sarah Williams', 
    email: 'sarah.williams@edusync.edu', 
    phone: '9876543220', 
    gender: 'Female',
    departmentId: 1,
    position: 'Assistant Professor',
    qualification: 'PhD in Physics',
    date_of_joining: '2020-06-15',
    address: '707 University Ave, Faculty Housing',
    password_hash: 'hashed_password',
    created_at: '2020-06-15T09:00:00Z',
    updated_at: '2020-06-15T09:00:00Z'
  },
  { 
    id: 2, 
    name: 'Prof. Michael Brown', 
    email: 'michael.brown@edusync.edu', 
    phone: '9876543221', 
    gender: 'Male',
    departmentId: 1,
    position: 'Professor',
    qualification: 'PhD in Chemistry',
    date_of_joining: '2015-08-10',
    address: '808 College St, Faculty Quarters',
    password_hash: 'hashed_password',
    created_at: '2015-08-10T10:00:00Z',
    updated_at: '2015-08-10T10:00:00Z'
  },
  { 
    id: 3, 
    name: 'Prof. Emily Davis', 
    email: 'emily.davis@edusync.edu', 
    phone: '9876543222', 
    gender: 'Female',
    departmentId: 2,
    position: 'Associate Professor',
    qualification: 'MBA, PhD in Finance',
    date_of_joining: '2018-03-22',
    address: '909 Academic Blvd, Staff Residence',
    password_hash: 'hashed_password',
    created_at: '2018-03-22T11:30:00Z',
    updated_at: '2018-03-22T11:30:00Z'
  },
  { 
    id: 4, 
    name: 'Dr. Robert Chen', 
    email: 'robert.chen@edusync.edu', 
    phone: '9876543223', 
    gender: 'Male',
    departmentId: 3,
    position: 'Assistant Professor',
    qualification: 'PhD in Literature',
    date_of_joining: '2019-07-18',
    address: '101 Scholar Lane, Campus Housing',
    password_hash: 'hashed_password',
    created_at: '2019-07-18T14:00:00Z',
    updated_at: '2019-07-18T14:00:00Z'
  },
  { 
    id: 5, 
    name: 'Dr. Jessica Martinez', 
    email: 'jessica.martinez@edusync.edu', 
    phone: '9876543224', 
    gender: 'Female',
    departmentId: 4,
    position: 'Professor',
    qualification: 'PhD in Mechanical Engineering',
    date_of_joining: '2014-09-05',
    address: '202 Research Park, Faculty Housing',
    password_hash: 'hashed_password',
    created_at: '2014-09-05T09:45:00Z',
    updated_at: '2014-09-05T09:45:00Z'
  },
  { 
    id: 6, 
    name: 'Dr. John Patel', 
    email: 'john.patel@edusync.edu', 
    phone: '9876543225', 
    gender: 'Male',
    departmentId: 5,
    position: 'Professor',
    qualification: 'MD, PhD in Cardiology',
    date_of_joining: '2010-11-30',
    address: '303 Medical Campus, Staff Quarters',
    password_hash: 'hashed_password',
    created_at: '2010-11-30T08:20:00Z',
    updated_at: '2010-11-30T08:20:00Z'
  }
];

// Admin
export const mockAdmin = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@edusync.edu',
    phone: '9876543299',
    password_hash: 'hashed_admin_password',
    created_at: '2010-01-01T00:00:00Z',
    updated_at: '2010-01-01T00:00:00Z'
  }
];

// Courses
export const mockCourses = [
  {
    id: 1,
    name: 'Physics',
    course_code: 'PHY101',
    description: 'Basic principles of physics with laboratory experiments',
    credits: 4,
    departmentId: 1,
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Chemistry',
    course_code: 'CHM101',
    description: 'Fundamental concepts of chemistry and chemical reactions',
    credits: 4,
    departmentId: 1,
    created_at: '2023-01-15T10:15:00Z',
    updated_at: '2023-01-15T10:15:00Z'
  },
  {
    id: 3,
    name: 'Biology',
    course_code: 'BIO101',
    description: 'Introduction to basic biological concepts',
    credits: 3,
    departmentId: 1,
    created_at: '2023-01-15T10:30:00Z',
    updated_at: '2023-01-15T10:30:00Z'
  },
  {
    id: 4,
    name: 'Accounting Principles',
    course_code: 'ACC101',
    description: 'Basic principles of accounting and financial statements',
    credits: 3,
    departmentId: 2,
    created_at: '2023-01-16T09:00:00Z',
    updated_at: '2023-01-16T09:00:00Z'
  },
  {
    id: 5,
    name: 'Business Economics',
    course_code: 'ECO101',
    description: 'Introduction to economic principles for business',
    credits: 3,
    departmentId: 2,
    created_at: '2023-01-16T09:15:00Z',
    updated_at: '2023-01-16T09:15:00Z'
  },
  {
    id: 6,
    name: 'English Literature',
    course_code: 'ENG101',
    description: 'Survey of major works of English literature',
    credits: 3,
    departmentId: 3,
    created_at: '2023-01-17T10:00:00Z',
    updated_at: '2023-01-17T10:00:00Z'
  },
  {
    id: 7,
    name: 'World History',
    course_code: 'HIS101',
    description: 'Overview of world history from ancient civilizations to modern era',
    credits: 3,
    departmentId: 3,
    created_at: '2023-01-17T10:15:00Z',
    updated_at: '2023-01-17T10:15:00Z'
  },
  {
    id: 8,
    name: 'Engineering Mathematics',
    course_code: 'MTH201',
    description: 'Advanced mathematics for engineering applications',
    credits: 4,
    departmentId: 4,
    created_at: '2023-01-18T09:00:00Z',
    updated_at: '2023-01-18T09:00:00Z'
  },
  {
    id: 9,
    name: 'Human Anatomy',
    course_code: 'MED101',
    description: 'Detailed study of human body structure',
    credits: 5,
    departmentId: 5,
    created_at: '2023-01-19T08:30:00Z',
    updated_at: '2023-01-19T08:30:00Z'
  }
];

// Schedules (Timetable)
export const mockSchedules = [
  {
    id: 1,
    day_of_week: 'Monday',
    start_time: '09:00:00',
    end_time: '10:30:00',
    room: 'Lab 101',
    courseId: 1,
    facultyId: 1,
    classId: 1,
    sectionId: 1
  },
  {
    id: 2,
    day_of_week: 'Monday',
    start_time: '10:45:00',
    end_time: '12:15:00',
    room: 'Lab 102',
    courseId: 2,
    facultyId: 2,
    classId: 1,
    sectionId: 1
  },
  {
    id: 3,
    day_of_week: 'Tuesday',
    start_time: '09:00:00',
    end_time: '10:30:00',
    room: 'Lab 103',
    courseId: 3,
    facultyId: 1,
    classId: 1,
    sectionId: 1
  },
  {
    id: 4,
    day_of_week: 'Tuesday',
    start_time: '10:45:00',
    end_time: '12:15:00',
    room: 'Room 201',
    courseId: 1,
    facultyId: 1,
    classId: 1,
    sectionId: 2
  },
  {
    id: 5,
    day_of_week: 'Wednesday',
    start_time: '09:00:00',
    end_time: '10:30:00',
    room: 'Room 202',
    courseId: 4,
    facultyId: 3,
    classId: 4,
    sectionId: 7
  },
  {
    id: 6,
    day_of_week: 'Wednesday',
    start_time: '10:45:00',
    end_time: '12:15:00',
    room: 'Room 203',
    courseId: 5,
    facultyId: 3,
    classId: 4,
    sectionId: 7
  },
  {
    id: 7,
    day_of_week: 'Thursday',
    start_time: '09:00:00',
    end_time: '10:30:00',
    room: 'Room 301',
    courseId: 6,
    facultyId: 4,
    classId: 7,
    sectionId: 13
  },
  {
    id: 8,
    day_of_week: 'Thursday',
    start_time: '10:45:00',
    end_time: '12:15:00',
    room: 'Room 302',
    courseId: 7,
    facultyId: 4,
    classId: 7,
    sectionId: 13
  },
  {
    id: 9,
    day_of_week: 'Friday',
    start_time: '09:00:00',
    end_time: '10:30:00',
    room: 'Lab 201',
    courseId: 8,
    facultyId: 5,
    classId: 10,
    sectionId: 19
  },
  {
    id: 10,
    day_of_week: 'Friday',
    start_time: '10:45:00',
    end_time: '12:15:00',
    room: 'Lab 301',
    courseId: 9,
    facultyId: 6,
    classId: 12,
    sectionId: 23
  }
];

// Enrollments
export const mockEnrollments = [
  { id: 1, studentId: 1, courseId: 1, enrollment_date: '2023-07-15T10:00:00Z' },
  { id: 2, studentId: 1, courseId: 2, enrollment_date: '2023-07-15T10:05:00Z' },
  { id: 3, studentId: 1, courseId: 3, enrollment_date: '2023-07-15T10:10:00Z' },
  { id: 4, studentId: 2, courseId: 1, enrollment_date: '2023-07-15T11:00:00Z' },
  { id: 5, studentId: 2, courseId: 2, enrollment_date: '2023-07-15T11:05:00Z' },
  { id: 6, studentId: 2, courseId: 3, enrollment_date: '2023-07-15T11:10:00Z' },
  { id: 7, studentId: 3, courseId: 1, enrollment_date: '2023-07-16T09:00:00Z' },
  { id: 8, studentId: 3, courseId: 2, enrollment_date: '2023-07-16T09:05:00Z' },
  { id: 9, studentId: 4, courseId: 4, enrollment_date: '2023-07-16T10:00:00Z' },
  { id: 10, studentId: 4, courseId: 5, enrollment_date: '2023-07-16T10:05:00Z' },
  { id: 11, studentId: 5, courseId: 6, enrollment_date: '2023-07-17T09:30:00Z' },
  { id: 12, studentId: 5, courseId: 7, enrollment_date: '2023-07-17T09:35:00Z' },
  { id: 13, studentId: 6, courseId: 8, enrollment_date: '2023-07-17T10:30:00Z' },
  { id: 14, studentId: 7, courseId: 9, enrollment_date: '2023-07-18T09:00:00Z' },
  { id: 15, studentId: 8, courseId: 9, enrollment_date: '2023-07-18T09:30:00Z' }
];

// Attendance
export const mockAttendance = [
  { id: 1, studentId: 1, courseId: 1, date: '2023-08-07', status: 'Present' },
  { id: 2, studentId: 2, courseId: 1, date: '2023-08-07', status: 'Present' },
  { id: 3, studentId: 3, courseId: 1, date: '2023-08-07', status: 'Absent' },
  { id: 4, studentId: 1, courseId: 2, date: '2023-08-07', status: 'Present' },
  { id: 5, studentId: 2, courseId: 2, date: '2023-08-07', status: 'Present' },
  { id: 6, studentId: 3, courseId: 2, date: '2023-08-07', status: 'Late' },
  { id: 7, studentId: 4, courseId: 4, date: '2023-08-09', status: 'Present' },
  { id: 8, studentId: 4, courseId: 5, date: '2023-08-09', status: 'Present' },
  { id: 9, studentId: 5, courseId: 6, date: '2023-08-10', status: 'Present' },
  { id: 10, studentId: 5, courseId: 7, date: '2023-08-10', status: 'Absent' },
  { id: 11, studentId: 6, courseId: 8, date: '2023-08-11', status: 'Present' },
  { id: 12, studentId: 7, courseId: 9, date: '2023-08-11', status: 'Present' },
  { id: 13, studentId: 8, courseId: 9, date: '2023-08-11', status: 'Present' },
  { id: 14, studentId: 1, courseId: 1, date: '2023-08-14', status: 'Present' },
  { id: 15, studentId: 2, courseId: 1, date: '2023-08-14', status: 'Present' },
  { id: 16, studentId: 3, courseId: 1, date: '2023-08-14', status: 'Present' },
  { id: 17, studentId: 1, courseId: 2, date: '2023-08-14', status: 'Present' },
  { id: 18, studentId: 2, courseId: 2, date: '2023-08-14', status: 'Absent' },
  { id: 19, studentId: 3, courseId: 2, date: '2023-08-14', status: 'Present' }
];

// Invoices
export const mockInvoices = [
  {
    id: 1,
    invoice_number: 'INV-2023-001',
    studentId: 1,
    amount: 25000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-15',
    paid: true,
    paid_date: '2023-08-10',
    payment_method: 'Bank Transfer',
    generated_at: '2023-07-20T10:00:00Z',
    updated_at: '2023-08-10T14:30:00Z'
  },
  {
    id: 2,
    invoice_number: 'INV-2023-002',
    studentId: 2,
    amount: 25000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-15',
    paid: true,
    paid_date: '2023-08-12',
    payment_method: 'Credit Card',
    generated_at: '2023-07-20T10:15:00Z',
    updated_at: '2023-08-12T11:20:00Z'
  },
  {
    id: 3,
    invoice_number: 'INV-2023-003',
    studentId: 3,
    amount: 25000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-15',
    paid: false,
    paid_date: null,
    payment_method: null,
    generated_at: '2023-07-20T10:30:00Z',
    updated_at: '2023-07-20T10:30:00Z'
  },
  {
    id: 4,
    invoice_number: 'INV-2023-004',
    studentId: 4,
    amount: 27000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-15',
    paid: true,
    paid_date: '2023-08-05',
    payment_method: 'Bank Transfer',
    generated_at: '2023-07-21T09:00:00Z',
    updated_at: '2023-08-05T15:45:00Z'
  },
  {
    id: 5,
    invoice_number: 'INV-2023-005',
    studentId: 5,
    amount: 22000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-15',
    paid: false,
    paid_date: null,
    payment_method: null,
    generated_at: '2023-07-21T09:15:00Z',
    updated_at: '2023-07-21T09:15:00Z'
  },
  {
    id: 6,
    invoice_number: 'INV-2023-006',
    studentId: 6,
    amount: 32000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-20',
    paid: true,
    paid_date: '2023-08-15',
    payment_method: 'Credit Card',
    generated_at: '2023-07-22T10:00:00Z',
    updated_at: '2023-08-15T13:10:00Z'
  },
  {
    id: 7,
    invoice_number: 'INV-2023-007',
    studentId: 7,
    amount: 40000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-20',
    paid: false,
    paid_date: null,
    payment_method: null,
    generated_at: '2023-07-22T10:15:00Z',
    updated_at: '2023-07-22T10:15:00Z'
  },
  {
    id: 8,
    invoice_number: 'INV-2023-008',
    studentId: 8,
    amount: 40000,
    description: 'Tuition fee for First Semester 2023',
    due_date: '2023-08-20',
    paid: true,
    paid_date: '2023-08-01',
    payment_method: 'Bank Transfer',
    generated_at: '2023-07-22T10:30:00Z',
    updated_at: '2023-08-01T09:25:00Z'
  }
];

// Events
export const mockEvents = [
  {
    id: 1,
    title: 'Orientation Day',
    description: 'Orientation for new students',
    event_date: '2023-07-25',
    start_time: '09:00:00',
    end_time: '13:00:00',
    location: 'Main Auditorium',
    organizer: 'Student Affairs Office',
    status: 'Completed',
    created_at: '2023-07-01T10:00:00Z',
    updated_at: '2023-07-26T09:00:00Z'
  },
  {
    id: 2,
    title: 'Science Exhibition',
    description: 'Annual science exhibition showcasing student projects',
    event_date: '2023-08-15',
    start_time: '10:00:00',
    end_time: '16:00:00',
    location: 'Science Block',
    organizer: 'Science Department',
    status: 'Upcoming',
    created_at: '2023-07-10T11:00:00Z',
    updated_at: '2023-07-10T11:00:00Z'
  },
  {
    id: 3,
    title: 'Career Fair',
    description: 'Annual career fair with company representatives',
    event_date: '2023-09-05',
    start_time: '10:00:00',
    end_time: '17:00:00',
    location: 'College Gymnasium',
    organizer: 'Career Services',
    status: 'Upcoming',
    created_at: '2023-07-15T09:30:00Z',
    updated_at: '2023-07-15T09:30:00Z'
  },
  {
    id: 4,
    title: 'Annual Sports Day',
    description: 'Institution-wide sports competition',
    event_date: '2023-09-20',
    start_time: '08:00:00',
    end_time: '18:00:00',
    location: 'Sports Complex',
    organizer: 'Physical Education Department',
    status: 'Upcoming',
    created_at: '2023-07-20T14:00:00Z',
    updated_at: '2023-07-20T14:00:00Z'
  },
  {
    id: 5,
    title: 'Parents-Teacher Meeting',
    description: 'Semester progress review with parents',
    event_date: '2023-10-10',
    start_time: '14:00:00',
    end_time: '18:00:00',
    location: 'Multiple Classrooms',
    organizer: 'Academic Affairs',
    status: 'Upcoming',
    created_at: '2023-07-25T10:15:00Z',
    updated_at: '2023-07-25T10:15:00Z'
  }
];

// Event Audiences
export const mockEventAudiences = [
  { id: 1, eventId: 1, audience_type: 'Students', departmentId: null, classId: null, sectionId: null },
  { id: 2, eventId: 2, audience_type: 'Students', departmentId: 1, classId: null, sectionId: null },
  { id: 3, eventId: 3, audience_type: 'Students', departmentId: null, classId: null, sectionId: null },
  { id: 4, eventId: 3, audience_type: 'Faculty', departmentId: null, classId: null, sectionId: null },
  { id: 5, eventId: 4, audience_type: 'Students', departmentId: null, classId: null, sectionId: null },
  { id: 6, eventId: 4, audience_type: 'Faculty', departmentId: null, classId: null, sectionId: null },
  { id: 7, eventId: 5, audience_type: 'Students', departmentId: null, classId: null, sectionId: null },
  { id: 8, eventId: 5, audience_type: 'Parents', departmentId: null, classId: null, sectionId: null }
];

// Messages
export const mockMessages = [
  {
    id: 1,
    title: 'Leave Application',
    content: 'I would like to request leave for medical reasons from September 10-12, 2023.',
    sender_id: 3,
    sender_type: 'faculty',
    receiver_id: 1,
    receiver_type: 'admin',
    read: true,
    sent_at: '2023-08-01T10:15:00Z'
  },
  {
    id: 2,
    title: 'Re: Leave Application',
    content: 'Your leave request has been approved. Please ensure your classes are covered.',
    sender_id: 1,
    sender_type: 'admin',
    receiver_id: 3,
    receiver_type: 'faculty',
    read: true,
    sent_at: '2023-08-01T11:30:00Z'
  },
  {
    id: 3,
    title: 'Upcoming Science Exhibition',
    content: 'Please prepare your students for the upcoming science exhibition on August 15.',
    sender_id: 1,
    sender_type: 'admin',
    receiver_id: 1,
    receiver_type: 'faculty',
    read: true,
    sent_at: '2023-08-02T09:00:00Z'
  },
  {
    id: 4,
    title: 'Fee Payment Reminder',
    content: 'This is a reminder that your tuition fee payment is due on August 15.',
    sender_id: 1,
    sender_type: 'admin',
    receiver_id: 3,
    receiver_type: 'student',
    read: false,
    sent_at: '2023-08-05T14:00:00Z'
  },
  {
    id: 5,
    title: 'Request for Lab Equipment',
    content: 'We need additional lab equipment for the physics practical classes. Could you please approve the purchase?',
    sender_id: 1,
    sender_type: 'faculty',
    receiver_id: 1,
    receiver_type: 'admin',
    read: false,
    sent_at: '2023-08-08T11:20:00Z'
  }
];

// Leave Requests
export const mockLeaveRequests = [
  {
    id: 1,
    facultyId: 1,
    departmentId: 1,
    leave_type: 'Medical',
    leave_date: '2023-08-25',
    courseId: 1,
    classId: 1,
    sectionId: 1,
    reason: 'Medical appointment',
    status: 'Approved',
    approval_date: '2023-08-15T10:00:00Z',
    approved_by: 1,
    created_at: '2023-08-10T09:30:00Z',
    updated_at: '2023-08-15T10:00:00Z'
  },
  {
    id: 2,
    facultyId: 2,
    departmentId: 1,
    leave_type: 'Personal',
    leave_date: '2023-08-30',
    courseId: 2,
    classId: 1,
    sectionId: 1,
    reason: 'Family function',
    status: 'Pending',
    approval_date: null,
    approved_by: null,
    created_at: '2023-08-15T14:20:00Z',
    updated_at: '2023-08-15T14:20:00Z'
  },
  {
    id: 3,
    facultyId: 3,
    departmentId: 2,
    leave_type: 'Medical',
    leave_date: '2023-09-05',
    courseId: 4,
    classId: 4,
    sectionId: 7,
    reason: 'Not feeling well',
    status: 'Approved',
    approval_date: '2023-08-30T11:15:00Z',
    approved_by: 1,
    created_at: '2023-08-25T10:10:00Z',
    updated_at: '2023-08-30T11:15:00Z'
  },
  {
    id: 4,
    facultyId: 4,
    departmentId: 3,
    leave_type: 'Professional',
    leave_date: '2023-09-10',
    courseId: 6,
    classId: 7,
    sectionId: 13,
    reason: 'Attending academic conference',
    status: 'Approved',
    approval_date: '2023-09-01T09:45:00Z',
    approved_by: 1,
    created_at: '2023-08-28T11:30:00Z',
    updated_at: '2023-09-01T09:45:00Z'
  },
  {
    id: 5,
    facultyId: 5,
    departmentId: 4,
    leave_type: 'Personal',
    leave_date: '2023-09-15',
    courseId: 8,
    classId: 10,
    sectionId: 19,
    reason: 'Family emergency',
    status: 'Pending',
    approval_date: null,
    approved_by: null,
    created_at: '2023-09-10T08:20:00Z',
    updated_at: '2023-09-10T08:20:00Z'
  }
];

// Faculty Courses (Many-to-Many relationship between Faculty and Courses)
export const mockFacultyCourses = [
  { facultyId: 1, courseId: 1 },
  { facultyId: 1, courseId: 3 },
  { facultyId: 2, courseId: 2 },
  { facultyId: 3, courseId: 4 },
  { facultyId: 3, courseId: 5 },
  { facultyId: 4, courseId: 6 },
  { facultyId: 4, courseId: 7 },
  { facultyId: 5, courseId: 8 },
  { facultyId: 6, courseId: 9 }
];

// Course-Class relation (Many-to-Many relationship between Courses and Classes)
export const mockCourseClasses = [
  { courseId: 1, classId: 1 },
  { courseId: 2, classId: 1 },
  { courseId: 3, classId: 1 },
  { courseId: 1, classId: 2 },
  { courseId: 2, classId: 2 },
  { courseId: 3, classId: 2 },
  { courseId: 4, classId: 4 },
  { courseId: 5, classId: 4 },
  { courseId: 4, classId: 5 },
  { courseId: 5, classId: 5 },
  { courseId: 6, classId: 7 },
  { courseId: 7, classId: 7 },
  { courseId: 6, classId: 8 },
  { courseId: 7, classId: 8 },
  { courseId: 8, classId: 10 },
  { courseId: 8, classId: 11 },
  { courseId: 9, classId: 12 },
  { courseId: 9, classId: 13 }
];

// Course-Section relation (Many-to-Many relationship between Courses and Sections)
export const mockCourseSections = [
  { courseId: 1, sectionId: 1 },
  { courseId: 2, sectionId: 1 },
  { courseId: 3, sectionId: 1 },
  { courseId: 1, sectionId: 2 },
  { courseId: 2, sectionId: 2 },
  { courseId: 3, sectionId: 2 },
  { courseId: 1, sectionId: 3 },
  { courseId: 2, sectionId: 3 },
  { courseId: 3, sectionId: 3 },
  { courseId: 1, sectionId: 4 },
  { courseId: 2, sectionId: 4 },
  { courseId: 3, sectionId: 4 }
];

// Dashboard Stats
export const mockDashboardStats = {
  total_students: 8,
  total_faculty: 6,
  total_courses: 9,
  total_departments: 5,
  latest_events: [
    {
      id: 2,
      title: 'Science Exhibition',
      date: '2023-08-15'
    },
    {
      id: 3,
      title: 'Career Fair',
      date: '2023-09-05'
    },
    {
      id: 4,
      title: 'Annual Sports Day',
      date: '2023-09-20'
    }
  ],
  recent_activities: [
    {
      id: 1,
      action: 'Leave Request Approved',
      user: 'Dr. Sarah Williams',
      timestamp: '2023-08-15T10:00:00Z'
    },
    {
      id: 2,
      action: 'New Student Registered',
      user: 'Sophia Lee',
      timestamp: '2023-07-13T11:30:00Z'
    },
    {
      id: 3,
      action: 'Invoice Payment Received',
      user: 'John Smith',
      timestamp: '2023-08-10T14:30:00Z'
    }
  ]
};

// Attendance Analytics
export const mockAttendanceAnalytics = {
  overall_attendance_rate: 85,
  attendance_by_department: [
    { department: 'Science', rate: 90 },
    { department: 'Commerce', rate: 85 },
    { department: 'Arts', rate: 80 },
    { department: 'Engineering', rate: 88 },
    { department: 'Medicine', rate: 92 }
  ],
  attendance_by_class: [
    { class: 'Class 9 (Science)', rate: 88 },
    { class: 'Class 10 (Science)', rate: 92 },
    { class: 'Class 11 (Science)', rate: 90 },
    { class: 'Class 9 (Commerce)', rate: 84 },
    { class: 'Class 10 (Commerce)', rate: 85 },
    { class: 'Class 11 (Commerce)', rate: 86 }
  ],
  monthly_attendance: [
    { month: 'Aug', rate: 85 },
    { month: 'Sep', rate: 82 },
    { month: 'Oct', rate: 88 },
    { month: 'Nov', rate: 90 },
    { month: 'Dec', rate: 76 }
  ],
  students_with_low_attendance: [
    { id: 3, name: 'Sara Johnson', attendance_rate: 65 },
    { id: 7, name: 'James Wilson', attendance_rate: 70 }
  ]
};

// Department Distribution for Analytics
export const mockDepartmentDistribution = {
  labels: ['Science', 'Commerce', 'Arts', 'Engineering', 'Medicine'],
  data: [3, 2, 1, 1, 1],
  backgroundColor: [
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(153, 102, 255, 0.5)'
  ],
  borderColor: [
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(153, 102, 255, 1)'
  ]
};

// Faculty Performance
export const mockFacultyPerformance = {
  faculty_ratings: [
    { name: 'Dr. Sarah Williams', rating: 4.8 },
    { name: 'Prof. Michael Brown', rating: 4.5 },
    { name: 'Prof. Emily Davis', rating: 4.7 },
    { name: 'Dr. Robert Chen', rating: 4.6 },
    { name: 'Dr. Jessica Martinez', rating: 4.9 },
    { name: 'Dr. John Patel', rating: 4.8 }
  ],
  average_rating: 4.7,
  monthly_ratings: [
    { month: 'Aug', rating: 4.5 },
    { month: 'Sep', rating: 4.6 },
    { month: 'Oct', rating: 4.7 },
    { month: 'Nov', rating: 4.8 },
    { month: 'Dec', rating: 4.7 }
  ]
};

// Revenue Data
export const mockRevenueData = {
  total_revenue: 214000,
  total_pending: 87000,
  revenue_by_department: [
    { department: 'Science', amount: 75000 },
    { department: 'Commerce', amount: 27000 },
    { department: 'Arts', amount: 22000 },
    { department: 'Engineering', amount: 32000 },
    { department: 'Medicine', amount: 80000 }
  ],
  monthly_revenue: [
    { month: 'Aug', amount: 214000 },
    { month: 'Sep', expected: 100000 },
    { month: 'Oct', expected: 120000 },
    { month: 'Nov', expected: 90000 },
    { month: 'Dec', expected: 150000 }
  ],
  payment_methods: [
    { method: 'Bank Transfer', count: 3 },
    { method: 'Credit Card', count: 2 },
    { method: 'Cash', count: 0 }
  ],
  recent_payments: [
    { 
      id: 6, 
      invoice_number: 'INV-2023-006', 
      student_name: 'Maria Garcia', 
      amount: 32000, 
      date: '2023-08-15' 
    },
    { 
      id: 2, 
      invoice_number: 'INV-2023-002', 
      student_name: 'Emma Wilson', 
      amount: 25000, 
      date: '2023-08-12' 
    },
    { 
      id: 1, 
      invoice_number: 'INV-2023-001', 
      student_name: 'John Smith', 
      amount: 25000, 
      date: '2023-08-10' 
    }
  ]
};