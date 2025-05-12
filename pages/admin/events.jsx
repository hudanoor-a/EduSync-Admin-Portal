import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiPlus, FiCalendar, FiUsers, FiEdit, FiTrash2 } from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import EventForm from '../../components/EventForm';
import Calendar from '../../components/Calendar';
import { getEvents, getDepartments, getClasses, getSections, createEvent, updateEvent, deleteEvent } from '../../utils/adminApi';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [filters, setFilters] = useState({
    title: '',
    audience_type: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch departments, classes, and sections for filters and form
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        
        const classesData = await getClasses();
        setClasses(classesData);
        
        const sectionsData = await getSections();
        setSections(sectionsData);
        
        // Fetch events
        await fetchEvents();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { ...filters };
      
      const eventsData = await getEvents(queryParams);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowAddForm(true);
  };
  
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowAddForm(true);
  };
  
  const handleDeleteEvent = async (event) => {
    if (window.confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      try {
        await deleteEvent(event.id);
        // Refresh the event list
        fetchEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };
  
  const handleFormSubmit = async (eventData) => {
    try {
      if (selectedEvent) {
        // Update existing event
        await updateEvent(selectedEvent.id, eventData);
      } else {
        // Create new event
        await createEvent(eventData);
      }
      
      // Reset form state and refresh event list
      setSelectedEvent(null);
      setShowAddForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };
  
  const handleDateClick = (date, events) => {
    console.log('Date clicked:', date, 'Events:', events);
    // Could show events for this date or open add event form with this date preselected
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Define columns for the data table
  const columns = [
    { key: 'title', label: 'Event Title' },
    { key: 'description', label: 'Description' },
    { 
      key: 'event_date', 
      label: 'Date',
      render: (row) => formatDate(row.event_date)
    },
    { 
      key: 'audience_type', 
      label: 'Audience',
      render: (row) => {
        const audienceType = row.audience_type.charAt(0).toUpperCase() + row.audience_type.slice(1);
        
        if (row.audience_type === 'all') {
          return 'All Users';
        } else if (row.audience_type === 'student') {
          return 'All Students';
        } else if (row.audience_type === 'faculty') {
          return 'All Faculty';
        } else if (row.audience_id) {
          // Look up audience name based on type and ID
          let audienceName = '';
          
          if (row.audience_type === 'department') {
            const dept = departments.find(d => d.id === row.audience_id);
            audienceName = dept ? dept.name : '';
          } else if (row.audience_type === 'class') {
            const cls = classes.find(c => c.id === row.audience_id);
            audienceName = cls ? cls.name : '';
          } else if (row.audience_type === 'section') {
            const sec = sections.find(s => s.id === row.audience_id);
            audienceName = sec ? sec.name : '';
          }
          
          return `${audienceType}: ${audienceName}`;
        }
        
        return audienceType;
      }
    },
    { 
      key: 'created_at', 
      label: 'Created',
      render: (row) => formatDate(row.created_at || new Date())
    },
  ];
  
  // Generate filter options
  const filterOptions = [
    { 
      key: 'title', 
      label: 'Event Title', 
      type: 'text'
    },
    { 
      key: 'audience_type', 
      label: 'Audience', 
      type: 'select', 
      options: [
        { value: 'all', label: 'All Users' },
        { value: 'student', label: 'All Students' },
        { value: 'faculty', label: 'All Faculty' },
        { value: 'department', label: 'Department' },
        { value: 'class', label: 'Class' },
        { value: 'section', label: 'Section' },
      ]
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
  
  // Convert events to calendar format
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.event_date),
    description: event.description
  }));

  return (
    <>
      <Head>
        <title>Event Management | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddEvent}
              className="btn btn-primary flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Event
            </button>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiList className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiCalendar className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Add/Edit Event Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {selectedEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <EventForm
              event={selectedEvent}
              onSubmit={handleFormSubmit}
              departments={departments}
              classes={classes}
              sections={sections}
            />
          </div>
        )}

        {/* Events View (List or Calendar) */}
        {viewMode === 'list' ? (
          <DataTable
            columns={columns}
            data={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            searchable={true}
            pagination={true}
            itemsPerPage={10}
          />
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <Calendar 
              events={calendarEvents}
              onDateClick={handleDateClick}
            />
          </div>
        )}
      </div>
    </>
  );
}

// Add missing component
function FiList(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}
