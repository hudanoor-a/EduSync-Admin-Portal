import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCalendar, FiDownload, FiCheck, FiX, FiClock } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import AttendanceChart from '../../components/AttendanceChart';
import { 
  getAttendance, 
  getAttendanceAnalytics, 
  getDepartments, 
  getClasses, 
  getSections,
  getCourses,
  getStudents,
  getFaculty,
  updateAttendance
} from '../../utils/adminApi';

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    student: { overall: {}, departmentWise: {} },
    faculty: { overall: {}, departmentWise: {} }
  });
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('student'); // 'student' or 'faculty'
  const [filters, setFilters] = useState({
    departmentId: '',
    classId: '',
    sectionId: '',
    courseId: '',
    facultyId: '',
    date: new Date().toISOString().split('T')[0],
    status: '',
  });

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
        
        const studentsData = await getStudents();
        setStudents(studentsData);
        
        const facultyData = await getFaculty();
        setFaculty(facultyData);
        
        // Fetch attendance records
        await fetchAttendance();
        
        // Fetch analytics data
        const analyticsData = await getAttendanceAnalytics();
        setAnalyticsData(analyticsData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      
      // Add view type to filter params
      const queryParams = {
        ...filters,
        view_type: viewType,
      };
      
      const attendanceData = await getAttendance(queryParams);
      setAttendanceData(attendanceData);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAttendance();
  }, [filters, viewType]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleMarkAttendance = async (attendanceId, status) => {
    try {
      await updateAttendance(attendanceId, { status });
      fetchAttendance(); // Refresh data
    } catch (error) {
      console.error('Failed to update attendance:', error);
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
  
  // Generate filter options based on view type
  const getFilterOptions = () => {
    if (viewType === 'student') {
      return [
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
          options: classes
            .filter(cls => !filters.departmentId || cls.departmentId.toString() === filters.departmentId)
            .map(cls => ({ value: cls.id, label: cls.name }))
        },
        { 
          key: 'sectionId', 
          label: 'Section', 
          type: 'select', 
          options: sections
            .filter(sec => !filters.classId || sec.classId.toString() === filters.classId)
            .map(sec => ({ value: sec.id, label: sec.name }))
        },
        { 
          key: 'courseId', 
          label: 'Course', 
          type: 'select', 
          options: courses.map(course => ({ value: course.id, label: course.name }))
        },
        { 
          key: 'date', 
          label: 'Date', 
          type: 'date'
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
    } else {
      return [
        { 
          key: 'departmentId', 
          label: 'Department', 
          type: 'select', 
          options: departments.map(dept => ({ value: dept.id, label: dept.name }))
        },
        { 
          key: 'facultyId', 
          label: 'Faculty', 
          type: 'select', 
          options: faculty.map(f => ({ value: f.id, label: f.name }))
        },
        { 
          key: 'date', 
          label: 'Date', 
          type: 'date'
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
    }
  };
  
  // Define columns for the data table
  const getColumns = () => {
    if (viewType === 'student') {
      return [
        { 
          key: 'student', 
          label: 'Student',
          render: (row) => {
            const student = students.find(s => s.id === row.studentId);
            return student ? student.name : 'N/A';
          }
        },
        { 
          key: 'course', 
          label: 'Course',
          render: (row) => {
            const course = courses.find(c => c.id === row.courseId);
            return course ? course.name : 'N/A';
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
                : row.status === 'Late'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {row.status}
            </span>
          )
        },
        { 
          key: 'actions', 
          label: 'Mark As',
          render: (row) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleMarkAttendance(row.id, 'Present')}
                disabled={row.status === 'Present'}
                className={`p-1 rounded ${
                  row.status === 'Present'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                title="Mark as Present"
              >
                <FiCheck className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMarkAttendance(row.id, 'Absent')}
                disabled={row.status === 'Absent'}
                className={`p-1 rounded ${
                  row.status === 'Absent'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                title="Mark as Absent"
              >
                <FiX className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMarkAttendance(row.id, 'Late')}
                disabled={row.status === 'Late'}
                className={`p-1 rounded ${
                  row.status === 'Late'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
                title="Mark as Late"
              >
                <FiClock className="h-4 w-4" />
              </button>
            </div>
          )
        },
      ];
    } else {
      return [
        { 
          key: 'faculty', 
          label: 'Faculty',
          render: (row) => {
            const teacher = faculty.find(f => f.id === row.facultyId);
            return teacher ? teacher.name : 'N/A';
          }
        },
        { 
          key: 'course', 
          label: 'Course',
          render: (row) => {
            const course = courses.find(c => c.id === row.courseId);
            return course ? course.name : 'N/A';
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
                : row.status === 'Late'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {row.status}
            </span>
          )
        },
        { 
          key: 'actions', 
          label: 'Mark As',
          render: (row) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleMarkAttendance(row.id, 'Present')}
                disabled={row.status === 'Present'}
                className={`p-1 rounded ${
                  row.status === 'Present'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                title="Mark as Present"
              >
                <FiCheck className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMarkAttendance(row.id, 'Absent')}
                disabled={row.status === 'Absent'}
                className={`p-1 rounded ${
                  row.status === 'Absent'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                title="Mark as Absent"
              >
                <FiX className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleMarkAttendance(row.id, 'Late')}
                disabled={row.status === 'Late'}
                className={`p-1 rounded ${
                  row.status === 'Late'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
                title="Mark as Late"
              >
                <FiClock className="h-4 w-4" />
              </button>
            </div>
          )
        },
      ];
    }
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

        {/* View Type Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setViewType('student')}
            className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
              viewType === 'student'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Student Attendance
          </button>
          <button
            onClick={() => setViewType('faculty')}
            className={`ml-2 py-2 px-4 font-medium text-sm rounded-t-lg ${
              viewType === 'faculty'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Faculty Attendance
          </button>
        </div>

        {/* Filters */}
        <FilterBar
          filters={getFilterOptions()}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Attendance Records Table */}
        <DataTable
          columns={getColumns()}
          data={attendanceData}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
          actionColumn={false}
        />

        {/* Attendance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Overall Attendance Trend</h2>
            <AttendanceChart 
              data={analyticsData[viewType].overall} 
              type={viewType}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {viewType === 'student' ? 'Department-wise Student Attendance' : 'Department-wise Faculty Attendance'}
            </h2>
            <div className="w-full h-80 p-4 bg-white rounded-lg shadow">
              <ChartComponent
                type="bar"
                data={{
                  labels: analyticsData[viewType].departmentWise.labels || [],
                  datasets: [
                    {
                      label: 'Present',
                      data: analyticsData[viewType].departmentWise.present || [],
                      backgroundColor: '#10B981',
                    },
                    {
                      label: 'Absent',
                      data: analyticsData[viewType].departmentWise.absent || [],
                      backgroundColor: '#EF4444',
                    },
                    {
                      label: 'Late',
                      data: analyticsData[viewType].departmentWise.late || [],
                      backgroundColor: '#F59E0B',
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Department-wise Attendance',
                      font: { size: 16 },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Department',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Percentage',
                      },
                      min: 0,
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return value + '%';
                        }
                      }
                    },
                  },
                }}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
