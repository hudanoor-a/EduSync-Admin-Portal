import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  FiPlus, 
  FiDownload, 
  FiDollarSign, 
  FiClock, 
  FiCheck, 
  FiXCircle 
} from 'react-icons/fi';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import InvoiceForm from '../../components/InvoiceForm';
import { getInvoices, getStudents, createInvoice, updateInvoice, deleteInvoice, markInvoicePaid } from '../../utils/adminApi';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    studentId: '',
    status: '',
    date_from: '',
    date_to: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch students for filters and form
        const studentsData = await getStudents();
        setStudents(studentsData);
        
        // Fetch invoices
        await fetchInvoices();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { ...filters };
      
      const invoicesData = await getInvoices(queryParams);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvoices();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setShowAddForm(true);
  };
  
  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowAddForm(true);
  };
  
  const handleDeleteInvoice = async (invoice) => {
    if (window.confirm(`Are you sure you want to delete invoice ${invoice.invoice_number}?`)) {
      try {
        await deleteInvoice(invoice.id);
        // Refresh the invoice list
        fetchInvoices();
      } catch (error) {
        console.error('Failed to delete invoice:', error);
        alert('Failed to delete invoice. Please try again.');
      }
    }
  };
  
  const handleMarkAsPaid = async (invoice) => {
    try {
      await markInvoicePaid(invoice.id);
      // Refresh the invoice list
      fetchInvoices();
    } catch (error) {
      console.error('Failed to mark invoice as paid:', error);
      alert('Failed to update invoice status. Please try again.');
    }
  };
  
  const handleFormSubmit = async (invoiceData) => {
    try {
      if (selectedInvoice) {
        // Update existing invoice
        await updateInvoice(selectedInvoice.id, invoiceData);
      } else {
        // Create new invoice
        await createInvoice(invoiceData);
      }
      
      // Reset form state and refresh invoice list
      setSelectedInvoice(null);
      setShowAddForm(false);
      fetchInvoices();
    } catch (error) {
      console.error('Failed to save invoice:', error);
      alert('Failed to save invoice. Please try again.');
    }
  };
  
  const handleGenerateAllInvoices = () => {
    if (window.confirm('Are you sure you want to generate invoices for all students?')) {
      // Logic to generate invoices for all students
      alert('This would generate invoices for all students based on their course enrollments.');
    }
  };
  
  const handleExportInvoices = () => {
    // Logic to export invoices to Excel/CSV
    alert('This would export the filtered invoices to Excel/CSV.');
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Define columns for the data table
  const columns = [
    { key: 'invoice_number', label: 'Invoice #' },
    { 
      key: 'student', 
      label: 'Student',
      render: (row) => {
        const student = students.find(s => s.id === row.studentId);
        return student ? student.name : 'N/A';
      }
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (row) => formatCurrency(row.amount)
    },
    { 
      key: 'due_date', 
      label: 'Due Date',
      render: (row) => formatDate(row.due_date)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.paid ? 'Paid' : 'Unpaid'}
        </span>
      )
    },
    { 
      key: 'generated_at', 
      label: 'Generated On',
      render: (row) => formatDate(row.generated_at)
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          {!row.paid && (
            <button
              onClick={() => handleMarkAsPaid(row)}
              className="p-1 text-green-600 hover:text-green-900"
              title="Mark as Paid"
            >
              <FiCheck className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => window.open(`/api/admin/invoices/${row.id}/pdf`, '_blank')}
            className="p-1 text-blue-600 hover:text-blue-900"
            title="Download PDF"
          >
            <FiDownload className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];
  
  // Generate filter options
  const filterOptions = [
    { 
      key: 'studentId', 
      label: 'Student', 
      type: 'select', 
      options: students.map(student => ({ value: student.id, label: student.name }))
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select', 
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'unpaid', label: 'Unpaid' },
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

  return (
    <>
      <Head>
        <title>Invoice Management | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Invoice Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddInvoice}
              className="btn btn-primary flex items-center"
            >
              <FiPlus className="mr-2" />
              Create Invoice
            </button>
            <button 
              onClick={handleGenerateAllInvoices}
              className="btn btn-secondary flex items-center"
            >
              <FiDollarSign className="mr-2" />
              Generate All
            </button>
            <button 
              onClick={handleExportInvoices}
              className="btn btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Invoice Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FiDollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(
                  invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
                )}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid Amount</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(
                  invoices
                    .filter(invoice => invoice.paid)
                    .reduce((sum, invoice) => sum + invoice.amount, 0)
                )}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <FiClock className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Amount</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(
                  invoices
                    .filter(invoice => !invoice.paid)
                    .reduce((sum, invoice) => sum + invoice.amount, 0)
                )}
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

        {/* Add/Edit Invoice Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}
            </h2>
            <InvoiceForm
              invoice={selectedInvoice}
              onSubmit={handleFormSubmit}
              students={students}
            />
          </div>
        )}

        {/* Invoices Data Table */}
        <DataTable
          columns={columns}
          data={invoices}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </>
  );
}
