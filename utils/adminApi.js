import { 
  mockStudents, 
  mockFaculty, 
  mockDepartments, 
  mockClasses, 
  mockSections 
} from './mockData';

// Helper functions to simulate API calls using the mock data

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

// Courses API functions

/**
 * Get all courses with optional filters
 * @param {Object} queryParams - Filter parameters
 * @returns {Promise<Array>} - List of courses
 */
export const getCourses = async (queryParams = {}) => {
  // Implement similar to getUsers
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would be implemented to return and filter mockCourses
  return [];
};

/**
 * Create a new course
 * @param {Object} courseData - Course data
 * @returns {Promise<Object>} - Created course
 */
export const createCourse = async (courseData) => {
  // Implement similar to createUser
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This would create a new course in mockCourses
  return {};
};

/**
 * Update an existing course
 * @param {number} courseId - Course ID
 * @param {Object} courseData - Updated course data
 * @returns {Promise<Object>} - Updated course
 */
export const updateCourse = async (courseId, courseData) => {
  // Implement similar to updateUser
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This would update a course in mockCourses
  return {};
};

/**
 * Delete a course
 * @param {number} courseId - Course ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteCourse = async (courseId) => {
  // Implement similar to deleteUser
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would delete a course from mockCourses
  return true;
};

// Other API functions would be implemented similarly for different features