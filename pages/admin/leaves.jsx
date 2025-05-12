import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCheck, FiX, FiFilter, FiDownload } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import { 
  getLeaveRequests, 
  getDepartments, 
  getClasses, 
  getSections, 
  getCourses, 
  getUsers, 
  approveLeave, 
  rejectLeave 
} from '../../utils/adminApi';

export default function Leaves() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    departmentId: '',
    facultyId: '',
    date_from: '',
    date_to: '',
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
        
        const facultyData = await getUsers({role: 'faculty'});
        setFaculty(facultyData);
        
        // Fetch leave requests
        await fetchLeaveRequests();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { ...filters };
      
      const leaveRequestsData = await getLeaveRequests(queryParams);
      setLeaveRequests(leaveRequestsData);
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLeaveRequests();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleApproveLeave = async (leaveId) => {
    try {
      await approveLeave(leaveId);
      // Refresh the leave request list
      fetchLeaveRequests();
    } catch (error) {
      console.error('Failed to approve leave request:', error);
      alert('Failed to approve leave request. Please try again.');
    }
  };
  
  const handleRejectLeave = async (leaveId) => {
    try {
      await rejectLeave(leaveId);
      // Refresh the leave request list
      fetchLeaveRequests();
    } catch (error) {
      console.error('Failed to reject leave request:', error);
      alert('Failed to reject leave request. Please try again.');
    }
  };
  
  const handleExportLeaves = () => {
    // Logic to export leave records to Excel/CSV
    alert('This would export the filtered leave requests to Excel/CSV.');
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Generate filter options
  const filterOptions = [
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select', 
      options: [
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
      ]
    },
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
      key: 'date_from', 
      label: 'From Date', 
      type: 'date'
    },
    { 
      key: 'date_to', 
      label: 'To Date', 
      type: 'date'
    },
  ];
  
  // Define columns for the data table
  const columns = [
    { 
      key: 'faculty', 
      label: 'Faculty Member',
      render: (row) => {
        const facultyMember = faculty.find(f => f.id === row.facultyId);
        return facultyMember ? facultyMember.name : 'N/A';
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
      key: 'leave_date', 
      label: 'Leave Date',
      render: (row) => formatDate(row.leave_date)
    },
    { 
      key: 'reason', 
      label: 'Reason',
      render: (row) => row.reason
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.status === 'Approved'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Rejected'
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
        row.status === 'Pending' ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleApproveLeave(row.id)}
              className="p-1 bg-green-100 text-green-700 hover:bg-green-200 rounded"
              title="Approve"
            >
              <FiCheck className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleRejectLeave(row.id)}
              className="p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
              title="Reject"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <span className="text-gray-400 text-sm italic">
            {row.status === 'Approved' ? 'Approved' : 'Rejected'}
          </span>
        )
      )
    },
  ];

  return (
    <>
      <Head>
        <title>Leave Requests | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Leave Request Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleExportLeaves}
              className="btn btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Leave Request Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <div className="h-6 w-6 text-yellow-700 flex items-center justify-center font-bold">P</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-xl font-bold text-gray-800">
                {leaveRequests.filter(leave => leave.status === 'Pending').length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <div className="h-6 w-6 text-green-700 flex items-center justify-center font-bold">A</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved Requests</p>
              <p className="text-xl font-bold text-gray-800">
                {leaveRequests.filter(leave => leave.status === 'Approved').length}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <div className="h-6 w-6 text-red-700 flex items-center justify-center font-bold">R</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rejected Requests</p>
              <p className="text-xl font-bold text-gray-800">
                {leaveRequests.filter(leave => leave.status === 'Rejected').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Leave Requests Data Table */}
        <DataTable
          columns={columns}
          data={leaveRequests}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
          actionColumn={false}
        />
      </div>
    </>
  );
}
