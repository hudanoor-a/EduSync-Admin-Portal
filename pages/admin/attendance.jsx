import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCheck, FiX, FiFilter, FiCalendar, FiDownload, FiSearch } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import AttendanceChart from '../../components/AttendanceChart';
import { 
  getAttendance, 
  getDepartments, 
  getClasses, 
  getSections, 
  getCourses, 
  getUsers,  
  updateAttendance 
} from '../../utils/adminApi';

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: '',
    departmentId: '',
    classId: '',
    sectionId: '',
    courseId: '',
    facultyId: '',
    status: '',
  });
  const [viewType, setViewType] = useState('daily'); // 'daily', 'monthly'

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch lookup data for filters
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        
        const classesData = await getClasses();
        setClasses(classesData);
        
        const sectionsData = await getSections();
        setSections(sectionsData);
        
        const coursesData = await getCourses();
        setCourses(coursesData);
        
        const facultyData = await getUsers({ role: 'faculty' });
        setFaculty(facultyData);
        
        const studentsData = await getUsers({ role: 'student' });
        setStudents(studentsData);
        
        // Fetch attendance records
        await fetchAttendanceRecords();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { ...filters };
      
      // Add any additional parameters for different view types
      if (viewType === 'monthly') {
        // For monthly view, you might want to get data for the whole month
        queryParams.view_type = 'monthly';
      }
      
      const attendanceData = await getAttendance(queryParams);
      setAttendanceRecords(attendanceData);
    } catch (error) {
      console.error('Failed to fetch attendance records:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAttendanceRecords();
  }, [filters, viewType]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleUpdateStatus = async (attendanceId, newStatus) => {
    try {
      await updateAttendance(attendanceId, { status: newStatus });
      // Refresh the attendance records
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Failed to update attendance status:', error);
      alert('Failed to update attendance status. Please try again.');
    }
  };
  
  const handleExportAttendance = () => {
    // Logic to export attendance records to Excel/CSV
    alert('This would export the filtered attendance records to Excel/CSV.');
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Generate filter options
  const filterOptions = [
    { 
      key: 'date', 
      label: 'Date', 
      type: 'date'
    },
    { 
      key: 'departmentId', 
      label: 'Department', 
      type: 'select', 
      options: departments.map(dept => ({ value: dept.id, label: dept.name }))
    },
    { 
      key: 'classId', 
      label: 'Class', 
      type: 'select', 
      options: classes.map(cls => ({ value: cls.id, label: cls.name }))
    },
    { 
      key: 'sectionId', 
      label: 'Section', 
      type: 'select', 
      options: sections.map(section => ({ value: section.id, label: section.name }))
    },
    { 
      key: 'courseId', 
      label: 'Course', 
      type: 'select', 
      options: courses.map(course => ({ value: course.id, label: course.name }))
    },
    { 
      key: 'facultyId', 
      label: 'Faculty', 
      type: 'select', 
      options: faculty.map(f => ({ value: f.id, label: f.name }))
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select', 
      options: [
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Late', label: 'Late' },
      ]
    },
  ];
  
  // Define columns for the data table
  const columns = [
    { 
      key: 'student', 
      label: 'Student',
      render: (row) => {
        const student = students.find(s => s.id === row.studentId);
        return student ? student.name : 'N/A';
      }
    },
    { 
      key: 'department', 
      label: 'Department',
      render: (row) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'N/A';
      }
    },
    { 
      key: 'class_section', 
      label: 'Class & Section',
      render: (row) => {
        const cls = classes.find(c => c.id === row.classId);
        const sec = sections.find(s => s.id === row.sectionId);
        return cls && sec ? `${cls.name} - ${sec.name}` : 'N/A';
      }
    },
    { 
      key: 'course', 
      label: 'Course',
      render: (row) => {
        const course = courses.find(c => c.id === row.courseId);
        return course ? `${course.name} (${course.course_code})` : 'N/A';
      }
    },
    { 
      key: 'faculty', 
      label: 'Faculty',
      render: (row) => {
        const teacher = faculty.find(f => f.id === row.facultyId);
        return teacher ? teacher.name : 'N/A';
      }
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (row) => formatDate(row.date)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.status === 'Present'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Absent'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdateStatus(row.id, 'Present')}
            className={`p-1 ${row.status === 'Present' ? 'bg-green-200' : 'bg-green-100'} text-green-700 hover:bg-green-200 rounded`}
            title="Mark Present"
          >
            <FiCheck className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleUpdateStatus(row.id, 'Absent')}
            className={`p-1 ${row.status === 'Absent' ? 'bg-red-200' : 'bg-red-100'} text-red-700 hover:bg-red-200 rounded`}
            title="Mark Absent"
          >
            <FiX className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleUpdateStatus(row.id, 'Late')}
            className={`p-1 ${row.status === 'Late' ? 'bg-yellow-200' : 'bg-yellow-100'} text-yellow-700 hover:bg-yellow-200 rounded`}
            title="Mark Late"
          >
            <FiCalendar className="h-4 w-4" />
          </button>
        </div>
      )
    },
  ];

  // Mock attendance data
  const studentAttendanceData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    present: [85, 82, 88, 90, 85],
    absent: [10, 12, 8, 5, 10],
    late: [5, 6, 4, 5, 5],
  };

  const facultyAttendanceData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    present: [92, 90, 94, 95, 93],
    absent: [5, 7, 4, 3, 5],
    late: [3, 3, 2, 2, 2],
  };

  return (
    <>
      <Head>
        <title>Attendance Management | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleExportAttendance}
              className="btn btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* View Type Toggle */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setViewType('daily')}
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              viewType === 'daily'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setViewType('monthly')}
            className={`ml-4 py-2 px-4 font-medium text-sm border-b-2 ${
              viewType === 'monthly'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Monthly Analytics
          </button>
        </div>

        {/* Content based on view type */}
        {viewType === 'daily' ? (
          <>
            {/* Daily View - Filters and Data Table */}
            <FilterBar
              filters={filterOptions}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
            />

            <DataTable
              columns={columns}
              data={attendanceRecords}
              searchable={true}
              pagination={true}
              itemsPerPage={10}
              loading={loading}
              actionColumn={false}
            />
          </>
        ) : (
          /* Monthly View - Analytics/Charts */
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <div className="h-6 w-6 text-green-700 flex items-center justify-center font-bold">P</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Present Rate</p>
                  <p className="text-xl font-bold text-gray-800">85%</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                  <div className="h-6 w-6 text-red-700 flex items-center justify-center font-bold">A</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Absent Rate</p>
                  <p className="text-xl font-bold text-gray-800">10%</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <div className="rounded-full bg-yellow-100 p-3 mr-4">
                  <div className="h-6 w-6 text-yellow-700 flex items-center justify-center font-bold">L</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Late Rate</p>
                  <p className="text-xl font-bold text-gray-800">5%</p>
                </div>
              </div>
            </div>

            {/* Attendance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttendanceChart data={studentAttendanceData} type="student" />
              <AttendanceChart data={facultyAttendanceData} type="faculty" />
            </div>

            {/* Department-wise Attendance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Department-wise Attendance Rate</h2>
              <div className="mt-6">
                {departments.map((dept, idx) => (
                  <div key={dept.id} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {85 + (idx % 10)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${85 + (idx % 10)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}