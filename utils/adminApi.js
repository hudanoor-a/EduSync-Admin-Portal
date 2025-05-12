import { 
  mockStudents, 
  mockFaculty, 
  mockDepartments, 
  mockClasses, 
  mockSections,
  mockCourses,
  mockSchedules,
  mockAttendance,
  mockEvents,
  mockInvoices,
  mockMessages,
  mockLeaveRequests,
  mockAttendanceAnalytics,
  mockDepartmentDistribution,
  mockFacultyPerformance,
  mockRevenueData
} from './mockData';

// Helper functions to simulate API calls using the mock data

// =========== USER MANAGEMENT ===========

/**
 * Get users (students or faculty) with optional filtering
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of users
 */
export const getUsers = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { role, departmentId, classId, sectionId, search } = queryParams;
  
  // Determine which data set to use based on role
  let userData = role === 'faculty' ? [...mockFaculty] : [...mockStudents];
  
  // Apply filters
  if (departmentId) {
    userData = userData.filter(user => user.departmentId === parseInt(departmentId));
  }
  
  if (classId && role === 'student') {
    userData = userData.filter(user => user.classId === parseInt(classId));
  }
  
  if (sectionId && role === 'student') {
    userData = userData.filter(user => user.sectionId === parseInt(sectionId));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    userData = userData.filter(user => 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower)
    );
  }
  
  return userData;
};

/**
 * Get departments
 * @returns {Promise<Array>} - List of departments
 */
export const getDepartments = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [...mockDepartments];
};

/**
 * Get classes with optional department filter
 * @param {number} departmentId - Department ID filter
 * @returns {Promise<Array>} - List of classes
 */
export const getClasses = async (departmentId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let classData = [...mockClasses];
  
  if (departmentId) {
    classData = classData.filter(cls => cls.departmentId === parseInt(departmentId));
  }
  
  return classData;
};

/**
 * Get sections with optional class filter
 * @param {number} classId - Class ID filter
 * @returns {Promise<Array>} - List of sections
 */
export const getSections = async (classId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let sectionData = [...mockSections];
  
  if (classId) {
    sectionData = sectionData.filter(section => section.classId === parseInt(classId));
  }
  
  return sectionData;
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} - Created user
 */
export const createUser = async (userData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate a new ID (in a real app, this would come from the backend)
  const newId = userData.role === 'faculty' 
    ? Math.max(...mockFaculty.map(f => f.id)) + 1 
    : Math.max(...mockStudents.map(s => s.id)) + 1;
  
  const newUser = {
    ...userData,
    id: newId,
    password_hash: 'hashed_' + userData.password, // In a real app, password would be hashed on the server
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Add to the appropriate mock data array
  if (userData.role === 'faculty') {
    mockFaculty.push(newUser);
  } else {
    mockStudents.push(newUser);
  }
  
  return newUser;
};

/**
 * Update an existing user
 * @param {number} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user
 */
export const updateUser = async (userId, userData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const id = parseInt(userId);
  const isStudent = userData.role === 'student';
  
  let userIndex;
  let user;
  
  if (isStudent) {
    userIndex = mockStudents.findIndex(s => s.id === id);
    if (userIndex === -1) throw new Error('Student not found');
    user = mockStudents[userIndex];
  } else {
    userIndex = mockFaculty.findIndex(f => f.id === id);
    if (userIndex === -1) throw new Error('Faculty not found');
    user = mockFaculty[userIndex];
  }
  
  // Update user data
  const updatedUser = {
    ...user,
    name: userData.name,
    email: userData.email,
    departmentId: userData.departmentId,
    updated_at: new Date().toISOString()
  };
  
  // Update password if provided
  if (userData.password) {
    updatedUser.password_hash = 'hashed_' + userData.password;
  }
  
  // Update student-specific fields
  if (isStudent) {
    updatedUser.classId = userData.classId;
    updatedUser.sectionId = userData.sectionId;
    mockStudents[userIndex] = updatedUser;
  } else {
    mockFaculty[userIndex] = updatedUser;
  }
  
  return updatedUser;
};

/**
 * Delete a user
 * @param {number} userId - User ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteUser = async (userId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(userId);
  
  // Try to find and delete from students
  const studentIndex = mockStudents.findIndex(s => s.id === id);
  if (studentIndex !== -1) {
    mockStudents.splice(studentIndex, 1);
    return true;
  }
  
  // Try to find and delete from faculty
  const facultyIndex = mockFaculty.findIndex(f => f.id === id);
  if (facultyIndex !== -1) {
    mockFaculty.splice(facultyIndex, 1);
    return true;
  }
  
  throw new Error('User not found');
};

// =========== COURSES ===========

/**
 * Get all courses with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of courses
 */
export const getCourses = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { departmentId, search } = queryParams;
  
  let courses = [...mockCourses];
  
  if (departmentId) {
    courses = courses.filter(course => course.departmentId === parseInt(departmentId));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    courses = courses.filter(course => 
      course.name.toLowerCase().includes(searchLower) || 
      course.course_code.toLowerCase().includes(searchLower)
    );
  }
  
  return courses;
};

/**
 * Create a new course
 * @param {Object} courseData - Course data
 * @returns {Promise<Object>} - Created course
 */
export const createCourse = async (courseData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockCourses.map(c => c.id)) + 1;
  
  const newCourse = {
    ...courseData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockCourses.push(newCourse);
  
  return newCourse;
};

/**
 * Update an existing course
 * @param {number} courseId - Course ID
 * @param {Object} courseData - Updated course data
 * @returns {Promise<Object>} - Updated course
 */
export const updateCourse = async (courseId, courseData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const id = parseInt(courseId);
  const courseIndex = mockCourses.findIndex(c => c.id === id);
  
  if (courseIndex === -1) throw new Error('Course not found');
  
  const course = mockCourses[courseIndex];
  
  const updatedCourse = {
    ...course,
    ...courseData,
    id,
    updated_at: new Date().toISOString()
  };
  
  mockCourses[courseIndex] = updatedCourse;
  
  return updatedCourse;
};

/**
 * Delete a course
 * @param {number} courseId - Course ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteCourse = async (courseId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(courseId);
  const courseIndex = mockCourses.findIndex(c => c.id === id);
  
  if (courseIndex === -1) throw new Error('Course not found');
  
  mockCourses.splice(courseIndex, 1);
  
  return true;
};

// =========== TIMETABLE / SCHEDULES ===========

/**
 * Get schedules with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of schedules
 */
export const getSchedules = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { view_type, departmentId, classId, sectionId, facultyId, day } = queryParams;
  
  let schedules = [...mockSchedules];
  
  if (day) {
    schedules = schedules.filter(schedule => schedule.day_of_week === day);
  }
  
  if (view_type === 'student') {
    // Student view filters
    if (departmentId && !classId) {
      schedules = schedules.filter(schedule => 
        mockClasses.find(c => c.id === schedule.classId)?.departmentId === parseInt(departmentId)
      );
    }
    
    if (classId) {
      schedules = schedules.filter(schedule => schedule.classId === parseInt(classId));
    }
    
    if (sectionId) {
      schedules = schedules.filter(schedule => schedule.sectionId === parseInt(sectionId));
    }
  } else {
    // Faculty view filters
    if (facultyId) {
      schedules = schedules.filter(schedule => schedule.facultyId === parseInt(facultyId));
    }
    
    if (departmentId) {
      schedules = schedules.filter(schedule => 
        mockFaculty.find(f => f.id === schedule.facultyId)?.departmentId === parseInt(departmentId)
      );
    }
  }
  
  // Add related data (in a real implementation, this would be done with joins in the database query)
  const schedulesWithRelated = schedules.map(schedule => {
    const course = mockCourses.find(c => c.id === schedule.courseId);
    const faculty = mockFaculty.find(f => f.id === schedule.facultyId);
    const classInfo = mockClasses.find(c => c.id === schedule.classId);
    const section = mockSections.find(s => s.id === schedule.sectionId);
    
    return {
      ...schedule,
      course,
      faculty,
      class: classInfo,
      section
    };
  });
  
  return schedulesWithRelated;
};

/**
 * Create a new schedule
 * @param {Object} scheduleData - Schedule data
 * @returns {Promise<Object>} - Created schedule
 */
export const createSchedule = async (scheduleData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockSchedules.map(s => s.id)) + 1;
  
  const newSchedule = {
    ...scheduleData,
    id: newId
  };
  
  mockSchedules.push(newSchedule);
  
  // Return with related data
  const course = mockCourses.find(c => c.id === newSchedule.courseId);
  const faculty = mockFaculty.find(f => f.id === newSchedule.facultyId);
  const classInfo = mockClasses.find(c => c.id === newSchedule.classId);
  const section = mockSections.find(s => s.id === newSchedule.sectionId);
  
  return {
    ...newSchedule,
    course,
    faculty,
    class: classInfo,
    section
  };
};

/**
 * Update a schedule
 * @param {number} scheduleId - Schedule ID
 * @param {Object} scheduleData - Updated schedule data
 * @returns {Promise<Object>} - Updated schedule
 */
export const updateSchedule = async (scheduleId, scheduleData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const id = parseInt(scheduleId);
  const scheduleIndex = mockSchedules.findIndex(s => s.id === id);
  
  if (scheduleIndex === -1) throw new Error('Schedule not found');
  
  const schedule = mockSchedules[scheduleIndex];
  
  const updatedSchedule = {
    ...schedule,
    ...scheduleData,
    id
  };
  
  mockSchedules[scheduleIndex] = updatedSchedule;
  
  // Return with related data
  const course = mockCourses.find(c => c.id === updatedSchedule.courseId);
  const faculty = mockFaculty.find(f => f.id === updatedSchedule.facultyId);
  const classInfo = mockClasses.find(c => c.id === updatedSchedule.classId);
  const section = mockSections.find(s => s.id === updatedSchedule.sectionId);
  
  return {
    ...updatedSchedule,
    course,
    faculty,
    class: classInfo,
    section
  };
};

/**
 * Delete a schedule
 * @param {number} scheduleId - Schedule ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteSchedule = async (scheduleId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(scheduleId);
  const scheduleIndex = mockSchedules.findIndex(s => s.id === id);
  
  if (scheduleIndex === -1) throw new Error('Schedule not found');
  
  mockSchedules.splice(scheduleIndex, 1);
  
  return true;
};

// =========== ATTENDANCE ===========

/**
 * Get attendance with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of attendance records
 */
export const getAttendance = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { view_type, departmentId, classId, sectionId, courseId, facultyId, date, status } = queryParams;
  
  let attendance = [...mockAttendance];
  
  if (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    
    attendance = attendance.filter(a => {
      const recordDate = new Date(a.date);
      return recordDate.getFullYear() === year && 
             recordDate.getMonth() === month && 
             recordDate.getDate() === day;
    });
  }
  
  if (status) {
    attendance = attendance.filter(a => a.status === status);
  }
  
  if (view_type === 'student') {
    // Student attendance filters
    if (courseId) {
      attendance = attendance.filter(a => a.courseId === parseInt(courseId));
    }
    
    if (departmentId || classId || sectionId) {
      attendance = attendance.filter(a => {
        const student = mockStudents.find(s => s.id === a.studentId);
        if (!student) return false;
        
        if (departmentId && student.departmentId !== parseInt(departmentId)) return false;
        if (classId && student.classId !== parseInt(classId)) return false;
        if (sectionId && student.sectionId !== parseInt(sectionId)) return false;
        
        return true;
      });
    }
  } else {
    // Faculty view would be implemented differently
    // For now, we'll return empty for faculty view to match the current implementation
    return [];
  }
  
  // Add related data
  const attendanceWithRelated = attendance.map(record => {
    const student = mockStudents.find(s => s.id === record.studentId);
    const course = mockCourses.find(c => c.id === record.courseId);
    
    return {
      ...record,
      student,
      course
    };
  });
  
  return attendanceWithRelated;
};

/**
 * Update attendance status
 * @param {number} attendanceId - Attendance ID
 * @param {Object} data - Update data (status)
 * @returns {Promise<Object>} - Updated attendance record
 */
export const updateAttendance = async (attendanceId, data) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(attendanceId);
  const attendanceIndex = mockAttendance.findIndex(a => a.id === id);
  
  if (attendanceIndex === -1) throw new Error('Attendance record not found');
  
  const attendance = mockAttendance[attendanceIndex];
  
  const updatedAttendance = {
    ...attendance,
    status: data.status
  };
  
  mockAttendance[attendanceIndex] = updatedAttendance;
  
  // Return with related data
  const student = mockStudents.find(s => s.id === updatedAttendance.studentId);
  const course = mockCourses.find(c => c.id === updatedAttendance.courseId);
  
  return {
    ...updatedAttendance,
    student,
    course
  };
};

/**
 * Get attendance analytics
 * @returns {Promise<Object>} - Attendance analytics data
 */
export const getAttendanceAnalytics = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockAttendanceAnalytics;
};

// =========== EVENTS ===========

/**
 * Get events with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of events
 */
export const getEvents = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { from_date, to_date, audience_type } = queryParams;
  
  let events = [...mockEvents];
  
  if (from_date) {
    const fromDate = new Date(from_date);
    events = events.filter(event => new Date(event.event_date) >= fromDate);
  }
  
  if (to_date) {
    const toDate = new Date(to_date);
    events = events.filter(event => new Date(event.event_date) <= toDate);
  }
  
  // Todo: Add audience_type filtering if needed
  
  return events;
};

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Promise<Object>} - Created event
 */
export const createEvent = async (eventData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockEvents.map(e => e.id)) + 1;
  
  const newEvent = {
    ...eventData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockEvents.push(newEvent);
  
  return newEvent;
};

/**
 * Update an event
 * @param {number} eventId - Event ID
 * @param {Object} eventData - Updated event data
 * @returns {Promise<Object>} - Updated event
 */
export const updateEvent = async (eventId, eventData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const id = parseInt(eventId);
  const eventIndex = mockEvents.findIndex(e => e.id === id);
  
  if (eventIndex === -1) throw new Error('Event not found');
  
  const event = mockEvents[eventIndex];
  
  const updatedEvent = {
    ...event,
    ...eventData,
    id,
    updated_at: new Date().toISOString()
  };
  
  mockEvents[eventIndex] = updatedEvent;
  
  return updatedEvent;
};

/**
 * Delete an event
 * @param {number} eventId - Event ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteEvent = async (eventId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(eventId);
  const eventIndex = mockEvents.findIndex(e => e.id === id);
  
  if (eventIndex === -1) throw new Error('Event not found');
  
  mockEvents.splice(eventIndex, 1);
  
  return true;
};

// =========== INVOICES ===========

/**
 * Get invoices with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of invoices
 */
export const getInvoices = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { studentId, paid, from_date, to_date } = queryParams;
  
  let invoices = [...mockInvoices];
  
  if (studentId) {
    invoices = invoices.filter(invoice => invoice.studentId === parseInt(studentId));
  }
  
  if (paid !== undefined) {
    const isPaid = paid === 'true' || paid === true;
    invoices = invoices.filter(invoice => invoice.paid === isPaid);
  }
  
  if (from_date) {
    const fromDate = new Date(from_date);
    invoices = invoices.filter(invoice => new Date(invoice.generated_at) >= fromDate);
  }
  
  if (to_date) {
    const toDate = new Date(to_date);
    invoices = invoices.filter(invoice => new Date(invoice.generated_at) <= toDate);
  }
  
  // Add student data to each invoice
  const invoicesWithStudents = invoices.map(invoice => {
    const student = mockStudents.find(s => s.id === invoice.studentId);
    return {
      ...invoice,
      student
    };
  });
  
  return invoicesWithStudents;
};

/**
 * Create a new invoice
 * @param {Object} invoiceData - Invoice data
 * @returns {Promise<Object>} - Created invoice
 */
export const createInvoice = async (invoiceData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockInvoices.map(i => i.id)) + 1;
  
  // Generate invoice number
  const today = new Date();
  const invoiceNumber = `INV-${today.getFullYear()}-${String(newId).padStart(3, '0')}`;
  
  const newInvoice = {
    ...invoiceData,
    id: newId,
    invoice_number: invoiceNumber,
    paid: false,
    generated_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockInvoices.push(newInvoice);
  
  // Add student data
  const student = mockStudents.find(s => s.id === newInvoice.studentId);
  
  return {
    ...newInvoice,
    student
  };
};

/**
 * Update an invoice
 * @param {number} invoiceId - Invoice ID
 * @param {Object} invoiceData - Updated invoice data
 * @returns {Promise<Object>} - Updated invoice
 */
export const updateInvoice = async (invoiceId, invoiceData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const id = parseInt(invoiceId);
  const invoiceIndex = mockInvoices.findIndex(i => i.id === id);
  
  if (invoiceIndex === -1) throw new Error('Invoice not found');
  
  const invoice = mockInvoices[invoiceIndex];
  
  const updatedInvoice = {
    ...invoice,
    ...invoiceData,
    id,
    updated_at: new Date().toISOString()
  };
  
  mockInvoices[invoiceIndex] = updatedInvoice;
  
  // Add student data
  const student = mockStudents.find(s => s.id === updatedInvoice.studentId);
  
  return {
    ...updatedInvoice,
    student
  };
};

/**
 * Delete an invoice
 * @param {number} invoiceId - Invoice ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteInvoice = async (invoiceId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(invoiceId);
  const invoiceIndex = mockInvoices.findIndex(i => i.id === id);
  
  if (invoiceIndex === -1) throw new Error('Invoice not found');
  
  mockInvoices.splice(invoiceIndex, 1);
  
  return true;
};

/**
 * Mark an invoice as paid
 * @param {number} invoiceId - Invoice ID
 * @returns {Promise<Object>} - Updated invoice
 */
export const markInvoicePaid = async (invoiceId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(invoiceId);
  const invoiceIndex = mockInvoices.findIndex(i => i.id === id);
  
  if (invoiceIndex === -1) throw new Error('Invoice not found');
  
  const invoice = mockInvoices[invoiceIndex];
  
  const updatedInvoice = {
    ...invoice,
    paid: true,
    updated_at: new Date().toISOString()
  };
  
  mockInvoices[invoiceIndex] = updatedInvoice;
  
  // Add student data
  const student = mockStudents.find(s => s.id === updatedInvoice.studentId);
  
  return {
    ...updatedInvoice,
    student
  };
};

// =========== MESSAGES ===========

/**
 * Get messages with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of messages
 */
export const getMessages = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { filter } = queryParams;
  
  // Admin ID (in a real app, would come from auth)
  const adminId = 1;
  
  let messages = [...mockMessages];
  
  if (filter === 'inbox') {
    // Messages received by admin
    messages = messages.filter(msg => msg.receiver_id === adminId && msg.receiver_type === 'admin');
  } else if (filter === 'sent') {
    // Messages sent by admin
    messages = messages.filter(msg => msg.sender_id === adminId && msg.sender_type === 'admin');
  } else {
    // All messages (both sent and received)
    messages = messages.filter(msg => 
      (msg.sender_id === adminId && msg.sender_type === 'admin') ||
      (msg.receiver_id === adminId && msg.receiver_type === 'admin')
    );
  }
  
  // Enhance messages with sender and receiver names
  // In a real implementation, this would be handled with joins in the database query
  const enhancedMessages = messages.map(message => {
    let senderName = 'Unknown';
    let receiverName = 'Unknown';
    
    // Get sender name
    if (message.sender_type === 'student') {
      const student = mockStudents.find(s => s.id === message.sender_id);
      senderName = student ? student.name : 'Unknown Student';
    } else if (message.sender_type === 'faculty') {
      const faculty = mockFaculty.find(f => f.id === message.sender_id);
      senderName = faculty ? faculty.name : 'Unknown Faculty';
    } else if (message.sender_type === 'admin') {
      senderName = 'Admin User';
    }
    
    // Get receiver name
    if (message.receiver_type === 'student') {
      const student = mockStudents.find(s => s.id === message.receiver_id);
      receiverName = student ? student.name : 'Unknown Student';
    } else if (message.receiver_type === 'faculty') {
      const faculty = mockFaculty.find(f => f.id === message.receiver_id);
      receiverName = faculty ? faculty.name : 'Unknown Faculty';
    } else if (message.receiver_type === 'admin') {
      receiverName = 'Admin User';
    }
    
    return {
      ...message,
      sender_name: senderName,
      receiver_name: receiverName
    };
  });
  
  return enhancedMessages;
};

/**
 * Send a new message
 * @param {Object} messageData - Message data
 * @returns {Promise<Object>} - Created message
 */
export const sendMessage = async (messageData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockMessages.map(m => m.id)) + 1;
  
  // Admin ID (in a real app, would come from auth)
  const adminId = 1;
  
  const newMessage = {
    ...messageData,
    id: newId,
    sender_id: adminId,
    sender_type: 'admin',
    sent_at: new Date().toISOString()
  };
  
  mockMessages.push(newMessage);
  
  // Get sender and receiver names
  let senderName = 'Admin User';
  let receiverName = 'Unknown';
  
  if (newMessage.receiver_type === 'student') {
    const student = mockStudents.find(s => s.id === newMessage.receiver_id);
    receiverName = student ? student.name : 'Unknown Student';
  } else if (newMessage.receiver_type === 'faculty') {
    const faculty = mockFaculty.find(f => f.id === newMessage.receiver_id);
    receiverName = faculty ? faculty.name : 'Unknown Faculty';
  } else if (newMessage.receiver_type === 'admin') {
    const admin = mockStudents.find(a => a.id === newMessage.receiver_id);
    receiverName = admin ? admin.name : 'Admin User';
  }
  
  return {
    ...newMessage,
    sender_name: senderName,
    receiver_name: receiverName
  };
};

/**
 * Delete a message
 * @param {number} messageId - Message ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteMessage = async (messageId) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(messageId);
  const messageIndex = mockMessages.findIndex(m => m.id === id);
  
  if (messageIndex === -1) throw new Error('Message not found');
  
  mockMessages.splice(messageIndex, 1);
  
  return true;
};

// =========== LEAVE REQUESTS ===========

/**
 * Get leave requests with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of leave requests
 */
export const getLeaveRequests = async (queryParams = {}) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { status, departmentId, facultyId, date_from, date_to } = queryParams;
  
  let leaveRequests = [...mockLeaveRequests];
  
  if (status) {
    leaveRequests = leaveRequests.filter(request => request.status === status);
  }
  
  if (departmentId) {
    leaveRequests = leaveRequests.filter(request => request.departmentId === parseInt(departmentId));
  }
  
  if (facultyId) {
    leaveRequests = leaveRequests.filter(request => request.facultyId === parseInt(facultyId));
  }
  
  if (date_from) {
    const fromDate = new Date(date_from);
    leaveRequests = leaveRequests.filter(request => new Date(request.leave_date) >= fromDate);
  }
  
  if (date_to) {
    const toDate = new Date(date_to);
    leaveRequests = leaveRequests.filter(request => new Date(request.leave_date) <= toDate);
  }
  
  // Add related data
  const requestsWithRelated = leaveRequests.map(request => {
    const faculty = mockFaculty.find(f => f.id === request.facultyId);
    const department = mockDepartments.find(d => d.id === request.departmentId);
    const classInfo = mockClasses.find(c => c.id === request.classId);
    const section = mockSections.find(s => s.id === request.sectionId);
    const course = mockCourses.find(c => c.id === request.courseId);
    
    return {
      ...request,
      faculty,
      department,
      class: classInfo,
      section,
      course
    };
  });
  
  return requestsWithRelated;
};

/**
 * Create a new leave request
 * @param {Object} leaveData - Leave request data
 * @returns {Promise<Object>} - Created leave request
 */
export const createLeaveRequest = async (leaveData) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newId = Math.max(...mockLeaveRequests.map(r => r.id)) + 1;
  
  const newRequest = {
    ...leaveData,
    id: newId,
    status: 'Pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockLeaveRequests.push(newRequest);
  
  // Add related data
  const faculty = mockFaculty.find(f => f.id === newRequest.facultyId);
  const department = mockDepartments.find(d => d.id === newRequest.departmentId);
  const classInfo = mockClasses.find(c => c.id === newRequest.classId);
  const section = mockSections.find(s => s.id === newRequest.sectionId);
  const course = mockCourses.find(c => c.id === newRequest.courseId);
  
  return {
    ...newRequest,
    faculty,
    department,
    class: classInfo,
    section,
    course
  };
};

/**
 * Update leave request status
 * @param {number} leaveId - Leave request ID
 * @param {Object} data - Update data (status)
 * @returns {Promise<Object>} - Updated leave request
 */
export const updateLeaveStatus = async (leaveId, data) => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const id = parseInt(leaveId);
  const leaveIndex = mockLeaveRequests.findIndex(r => r.id === id);
  
  if (leaveIndex === -1) throw new Error('Leave request not found');
  
  const leave = mockLeaveRequests[leaveIndex];
  
  const updatedLeave = {
    ...leave,
    status: data.status,
    updated_at: new Date().toISOString()
  };
  
  mockLeaveRequests[leaveIndex] = updatedLeave;
  
  // Add related data
  const faculty = mockFaculty.find(f => f.id === updatedLeave.facultyId);
  const department = mockDepartments.find(d => d.id === updatedLeave.departmentId);
  const classInfo = mockClasses.find(c => c.id === updatedLeave.classId);
  const section = mockSections.find(s => s.id === updatedLeave.sectionId);
  const course = mockCourses.find(c => c.id === updatedLeave.courseId);
  
  return {
    ...updatedLeave,
    faculty,
    department,
    class: classInfo,
    section,
    course
  };
};

/**
 * Approve a leave request
 * @param {number} leaveId - Leave request ID
 * @returns {Promise<Object>} - Updated leave request
 */
export const approveLeave = async (leaveId) => {
  return updateLeaveStatus(leaveId, { status: 'Approved' });
};

/**
 * Reject a leave request
 * @param {number} leaveId - Leave request ID
 * @returns {Promise<Object>} - Updated leave request
 */
export const rejectLeave = async (leaveId) => {
  return updateLeaveStatus(leaveId, { status: 'Rejected' });
};

// =========== ANALYTICS ===========

/**
 * Get all analytics data
 * @returns {Promise<Object>} - Analytics data
 */
export const getAllAnalytics = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    departmentDistribution: mockDepartmentDistribution,
    facultyPerformance: mockFacultyPerformance,
    revenueData: mockRevenueData,
    attendanceAnalytics: mockAttendanceAnalytics
  };
};

/**
 * Get department distribution analytics
 * @returns {Promise<Object>} - Department distribution data
 */
export const getDepartmentDistribution = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockDepartmentDistribution;
};

/**
 * Get faculty performance analytics
 * @returns {Promise<Object>} - Faculty performance data
 */
export const getFacultyPerformance = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockFacultyPerformance;
};

/**
 * Get revenue analytics
 * @returns {Promise<Object>} - Revenue data
 */
export const getRevenueData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockRevenueData;
};