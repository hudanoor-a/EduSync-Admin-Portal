import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiUserPlus, FiUpload, FiFilter } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import UserForm from '../../components/UserForm';
import FileUpload from '../../components/FileUpload';
import { getUsers, getDepartments, getClasses, getSections, createUser, updateUser, deleteUser } from '../../utils/adminApi';

export default function Users() {
  const [activeTab, setActiveTab] = useState('students');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    departmentId: '',
    classId: '',
    sectionId: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch departments, classes, and sections for filters
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        
        const classesData = await getClasses();
        setClasses(classesData);
        
        const sectionsData = await getSections();
        setSections(sectionsData);
        
        // Fetch users based on active tab
        await fetchUsers();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [activeTab]);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = {
        role: activeTab === 'students' ? 'student' : 'faculty',
        ...filters
      };
      
      const usersData = await getUsers(queryParams);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [filters, activeTab]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowAddForm(true);
    setShowImportForm(false);
  };
  
  const handleImportUsers = () => {
    setShowImportForm(true);
    setShowAddForm(false);
  };
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowAddForm(true);
    setShowImportForm(false);
  };
  
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user.id);
        // Refresh the user list
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };
  
  const handleFormSubmit = async (userData) => {
    try {
      if (selectedUser) {
        // Update existing user
        await updateUser(selectedUser.id, userData);
      } else {
        // Create new user
        await createUser(userData);
      }
      
      // Reset form state and refresh user list
      setSelectedUser(null);
      setShowAddForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
      alert('Failed to save user. Please try again.');
    }
  };
  
  const handleFileSelect = (file) => {
    console.log('File selected for import:', file);
    // Handle file upload logic
  };
  
  // Define columns for the data table
  const studentColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'department', 
      label: 'Department',
      render: (row) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'N/A';
      }
    },
    { 
      key: 'class', 
      label: 'Class',
      render: (row) => {
        const cls = classes.find(c => c.id === row.classId);
        return cls ? cls.name : 'N/A';
      }
    },
    { 
      key: 'section', 
      label: 'Section',
      render: (row) => {
        const sec = sections.find(s => s.id === row.sectionId);
        return sec ? sec.name : 'N/A';
      }
    },
  ];
  
  const facultyColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'department', 
      label: 'Department',
      render: (row) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'N/A';
      }
    },
  ];
  
  // Generate filter options for each dropdown
  const filterOptions = activeTab === 'students' 
    ? [
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
      ]
    : [
        { 
          key: 'departmentId', 
          label: 'Department', 
          type: 'select', 
          options: departments.map(dept => ({ value: dept.id, label: dept.name }))
        }
      ];

  return (
    <>
      <Head>
        <title>User Management | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'students' ? 'Student Management' : 'Faculty Management'}
          </h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddUser}
              className="btn btn-primary flex items-center"
            >
              <FiUserPlus className="mr-2" />
              Add {activeTab === 'students' ? 'Student' : 'Faculty'}
            </button>
            <button 
              onClick={handleImportUsers}
              className="btn btn-secondary flex items-center"
            >
              <FiUpload className="mr-2" />
              Import
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('students')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'students'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'faculty'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Faculty
            </button>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Add/Edit User Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {selectedUser 
                ? `Edit ${activeTab === 'students' ? 'Student' : 'Faculty'}` 
                : `Add New ${activeTab === 'students' ? 'Student' : 'Faculty'}`}
            </h2>
            <UserForm
              user={selectedUser}
              type={activeTab === 'students' ? 'student' : 'faculty'}
              onSubmit={handleFormSubmit}
              departments={departments}
              classes={classes}
              sections={sections}
            />
          </div>
        )}

        {/* Import Users Form */}
        {showImportForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Import {activeTab === 'students' ? 'Students' : 'Faculty'} from Excel
            </h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              label={`Upload ${activeTab === 'students' ? 'Students' : 'Faculty'} Excel`}
              helpText="Upload an Excel file with user data. The file should include columns for name, email, department, etc."
            />
            <div className="mt-4 text-sm text-gray-500">
              <p>Download sample Excel template:</p>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800"
              >
                {activeTab === 'students' ? 'Students' : 'Faculty'} Template.xlsx
              </a>
            </div>
          </div>
        )}

        {/* Users Data Table */}
        <DataTable
          columns={activeTab === 'students' ? studentColumns : facultyColumns}
          data={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </>
  );
}
