import React, { useState } from 'react';
import { FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';

export default function MessageComposer({ 
  onSend, 
  recipientOptions = [],
  isReply = false,
  replyToMessage = null
}) {
  const [formData, setFormData] = useState({
    receiver_type: isReply && replyToMessage ? replyToMessage.sender_type : 'student',
    receiver_id: isReply && replyToMessage ? replyToMessage.sender_id : '',
    subject: isReply && replyToMessage ? `Re: ${replyToMessage.subject}` : '',
    body: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isReply && !formData.receiver_id) {
      newErrors.receiver_id = 'Recipient is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Message body is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Convert to appropriate data types
      const submissionData = {
        ...formData,
        receiver_id: parseInt(formData.receiver_id),
      };
      
      onSend(submissionData);
      
      // Reset form after sending
      if (!isReply) {
        setFormData({
          receiver_type: 'student',
          receiver_id: '',
          subject: '',
          body: '',
        });
      } else {
        setFormData(prev => ({ ...prev, body: '' }));
      }
    }
  };

  const filteredRecipients = recipientOptions.filter(
    option => option.type === formData.receiver_type
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {isReply ? 'Reply to Message' : 'Compose New Message'}
      </h3>

      {!isReply && (
        <>
          {/* Recipient Type */}
          <div className="form-group">
            <label className="form-label">Recipient Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="receiver_type"
                  value="student"
                  checked={formData.receiver_type === 'student'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Student</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="receiver_type"
                  value="faculty"
                  checked={formData.receiver_type === 'faculty'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Faculty</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="receiver_type"
                  value="admin"
                  checked={formData.receiver_type === 'admin'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          {/* Recipient */}
          <div className="form-group">
            <label htmlFor="receiver_id" className="form-label flex items-center">
              <FiUser className="mr-2 text-gray-500" />
              Recipient
            </label>
            <select
              id="receiver_id"
              name="receiver_id"
              value={formData.receiver_id}
              onChange={handleChange}
              className={`input ${errors.receiver_id ? 'border-red-500' : ''}`}
            >
              <option value="">Select Recipient</option>
              {filteredRecipients.map(recipient => (
                <option key={recipient.id} value={recipient.id.toString()}>
                  {recipient.name} ({recipient.email})
                </option>
              ))}
            </select>
            {errors.receiver_id && <p className="mt-1 text-xs text-red-500">{errors.receiver_id}</p>}
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label flex items-center">
              <FiMessageSquare className="mr-2 text-gray-500" />
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`input ${errors.subject ? 'border-red-500' : ''}`}
              placeholder="Message subject"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
          </div>
        </>
      )}

      {/* If replying, show original message */}
      {isReply && replyToMessage && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
          <p className="text-sm text-gray-500">
            <strong>From:</strong> {replyToMessage.sender_name} ({replyToMessage.sender_type})
          </p>
          <p className="text-sm text-gray-500">
            <strong>Subject:</strong> {replyToMessage.subject}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Original Message:</strong>
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">
            {replyToMessage.body}
          </p>
        </div>
      )}

      {/* Message Body */}
      <div className="form-group">
        <label htmlFor="body" className="form-label flex items-center">
          <FiMessageSquare className="mr-2 text-gray-500" />
          Message
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows="6"
          className={`input ${errors.body ? 'border-red-500' : ''}`}
          placeholder="Type your message here..."
        ></textarea>
        {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          <FiSend className="mr-2" />
          {isReply ? 'Send Reply' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
