import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiPlus, FiUpload, FiFilter } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import CourseForm from '../../components/CourseForm';
import FileUpload from '../../components/FileUpload';
import { getCourses, getDepartments, createCourse, updateCourse, deleteCourse } from '../../utils/adminApi';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    departmentId: '',
    credit_hours: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch departments for filters and form
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        
        // Fetch courses
        await fetchCourses();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { ...filters };
      
      const coursesData = await getCourses(queryParams);
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowAddForm(true);
    setShowImportForm(false);
  };
  
  const handleImportCourses = () => {
    setShowImportForm(true);
    setShowAddForm(false);
  };
  
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowAddForm(true);
    setShowImportForm(false);
  };
  
  const handleDeleteCourse = async (course) => {
    if (window.confirm(`Are you sure you want to delete the course "${course.name}"?`)) {
      try {
        await deleteCourse(course.id);
        // Refresh the course list
        fetchCourses();
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course. Please try again.');
      }
    }
  };
  
  const handleFormSubmit = async (courseData) => {
    try {
      if (selectedCourse) {
        // Update existing course
        await updateCourse(selectedCourse.id, courseData);
      } else {
        // Create new course
        await createCourse(courseData);
      }
      
      // Reset form state and refresh course list
      setSelectedCourse(null);
      setShowAddForm(false);
      fetchCourses();
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course. Please try again.');
    }
  };
  
  const handleFileSelect = (file) => {
    console.log('File selected for import:', file);
    // Handle file upload logic
  };
  
  // Define columns for the data table
  const columns = [
    { key: 'course_code', label: 'Course Code' },
    { key: 'name', label: 'Course Name' },
    { 
      key: 'department', 
      label: 'Department',
      render: (row) => {
        const dept = departments.find(d => d.id === row.departmentId);
        return dept ? dept.name : 'N/A';
      }
    },
    { key: 'credit_hours', label: 'Credit Hours' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status || 'Active'}
        </span>
      )
    },
  ];
  
  // Generate filter options
  const filterOptions = [
    { 
      key: 'searchTerm', 
      label: 'Search', 
      type: 'text'
    },
    { 
      key: 'departmentId', 
      label: 'Department', 
      type: 'select', 
      options: departments.map(dept => ({ value: dept.id, label: dept.name }))
    },
    { 
      key: 'credit_hours', 
      label: 'Credit Hours', 
      type: 'select', 
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
      ]
    },
  ];

  return (
    <>
      <Head>
        <title>Course Management | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddCourse}
              className="btn btn-primary flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Course
            </button>
            <button 
              onClick={handleImportCourses}
              className="btn btn-secondary flex items-center"
            >
              <FiUpload className="mr-2" />
              Import
            </button>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Add/Edit Course Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {selectedCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <CourseForm
              course={selectedCourse}
              onSubmit={handleFormSubmit}
              departments={departments}
            />
          </div>
        )}

        {/* Import Courses Form */}
        {showImportForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Import Courses from Excel
            </h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              label="Upload Courses Excel"
              helpText="Upload an Excel file with course data. The file should include columns for course code, name, department, and credit hours."
            />
            <div className="mt-4 text-sm text-gray-500">
              <p>Download sample Excel template:</p>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800"
              >
                Courses Template.xlsx
              </a>
            </div>
          </div>
        )}

        {/* Courses Data Table */}
        <DataTable
          columns={columns}
          data={courses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </>
  );
}
