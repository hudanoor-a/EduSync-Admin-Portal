import React, { useState } from 'react';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function FileUpload({
  accept = '.xlsx, .xls, .csv',
  maxSize = 5, // in MB
  onFileSelect,
  label = 'Upload File',
  helpText = 'Upload an Excel or CSV file',
}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    // Check file type
    const fileType = selectedFile.type;
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!validTypes.includes(fileType) && !accept.includes(selectedFile.name.split('.').pop())) {
      setError(`Invalid file type. Please select ${accept} file.`);
      setFile(null);
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit.`);
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadSuccess(false);
    
    try {
      // Upload logic would go here
      // For demonstration purposes, simulating upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploadSuccess(true);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">{label}</h3>
          {file && !error && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                isUploading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 text-center">
          {!file ? (
            <>
              <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                <FiUpload className="h-6 w-6" />
              </div>
              <div className="mt-4 flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Select a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept={accept}
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">{helpText}</p>
            </>
          ) : (
            <div className="space-y-3">
              {uploadSuccess ? (
                <div className="flex items-center justify-center text-green-500">
                  <FiCheckCircle className="h-8 w-8" />
                </div>
              ) : (
                <div className="flex items-center justify-center text-blue-500">
                  <FiFile className="h-8 w-8" />
                </div>
              )}
              
              <div className="text-sm font-medium">{file.name}</div>
              <div className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
              
              {uploadSuccess && (
                <div className="text-sm text-green-600">
                  File uploaded successfully
                </div>
              )}
              
              {!uploadSuccess && !isUploading && (
                <button
                  onClick={() => setFile(null)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <div className="text-sm text-red-600 flex items-center">
            <FiAlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
