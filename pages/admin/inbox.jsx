import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiMail, FiInbox, FiSend, FiTrash2, FiRefreshCw, FiChevronDown, FiMessageSquare } from 'react-icons/fi';
import DataTable from '../../components/DataTable';
import MessageComposer from '../../components/MessageComposer';
import { getMessages, getRecipients, sendMessage, deleteMessage } from '../../utils/adminApi';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageFilter, setMessageFilter] = useState('inbox'); // 'inbox', 'sent', 'all'

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch recipient options (students, faculty, admins)
        const recipientsData = await getRecipients();
        setRecipients(recipientsData);
        
        // Fetch messages
        await fetchMessages();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Convert filters to query parameters
      const queryParams = { 
        filter: messageFilter 
      };
      
      const messagesData = await getMessages(queryParams);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMessages();
  }, [messageFilter]);
  
  const handleComposeClick = () => {
    setSelectedMessage(null);
    setShowComposeForm(true);
    setShowReplyForm(false);
  };
  
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowComposeForm(false);
    setShowReplyForm(false);
  };
  
  const handleReplyClick = () => {
    if (selectedMessage) {
      setShowReplyForm(true);
      setShowComposeForm(false);
    }
  };
  
  const handleDeleteMessage = async (message) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(message.id);
        // Refresh the message list
        fetchMessages();
        
        // Reset selected message if it was the one deleted
        if (selectedMessage && selectedMessage.id === message.id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert('Failed to delete message. Please try again.');
      }
    }
  };
  
  const handleSendMessage = async (messageData) => {
    try {
      await sendMessage(messageData);
      // Refresh the message list
      fetchMessages();
      // Reset form state
      setShowComposeForm(false);
      setShowReplyForm(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If the message was sent today, show only the time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If the message was sent within the last 7 days, show the day name
    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (daysDifference < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise, show the date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  // Filter messages based on selected filter
  const filteredMessages = messages.filter(message => {
    if (messageFilter === 'inbox') {
      return message.receiver_type === 'admin';
    } else if (messageFilter === 'sent') {
      return message.sender_type === 'admin';
    }
    return true; // 'all' filter
  });
  
  // Define columns for the data table
  const columns = [
    { 
      key: 'sender_receiver', 
      label: messageFilter === 'sent' ? 'To' : 'From',
      render: (row) => {
        if (messageFilter === 'sent') {
          // Show recipient
          const recipientType = row.receiver_type.charAt(0).toUpperCase() + row.receiver_type.slice(1);
          return `${row.receiver_name || 'Unknown'} (${recipientType})`;
        } else {
          // Show sender
          const senderType = row.sender_type.charAt(0).toUpperCase() + row.sender_type.slice(1);
          return `${row.sender_name || 'Unknown'} (${senderType})`;
        }
      }
    },
    { 
      key: 'subject', 
      label: 'Subject',
      render: (row) => (
        <div className="font-medium">{row.subject}</div>
      )
    },
    { 
      key: 'preview', 
      label: 'Message',
      render: (row) => (
        <div className="truncate max-w-xs">{row.body}</div>
      )
    },
    { 
      key: 'sent_at', 
      label: 'Date',
      render: (row) => formatDate(row.sent_at)
    },
  ];

  return (
    <>
      <Head>
        <title>Inbox | EduSync</title>
      </Head>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleComposeClick}
              className="btn btn-primary flex items-center"
            >
              <FiMessageSquare className="mr-2" />
              Compose
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <button 
                  onClick={handleComposeClick}
                  className="w-full btn btn-primary flex items-center justify-center"
                >
                  <FiMessageSquare className="mr-2" />
                  Compose
                </button>
              </div>
              <div>
                <button
                  onClick={() => setMessageFilter('inbox')}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    messageFilter === 'inbox'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiInbox className="mr-3" />
                  <span>Inbox</span>
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
                    {messages.filter(m => m.receiver_type === 'admin').length}
                  </span>
                </button>
                <button
                  onClick={() => setMessageFilter('sent')}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    messageFilter === 'sent'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiSend className="mr-3" />
                  <span>Sent</span>
                </button>
                <button
                  onClick={() => setMessageFilter('all')}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    messageFilter === 'all'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiMail className="mr-3" />
                  <span>All Messages</span>
                </button>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={fetchMessages}
                  className="w-full flex items-center justify-center text-sm text-gray-700 hover:text-gray-900"
                >
                  <FiRefreshCw className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showComposeForm ? (
              <MessageComposer
                onSend={handleSendMessage}
                recipientOptions={recipients}
              />
            ) : showReplyForm && selectedMessage ? (
              <MessageComposer
                onSend={handleSendMessage}
                recipientOptions={recipients}
                isReply={true}
                replyToMessage={selectedMessage}
              />
            ) : selectedMessage ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-800">{selectedMessage.subject}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedMessage.sender_type === 'admin' ? 'To: ' : 'From: '}
                      <span className="font-medium">
                        {selectedMessage.sender_type === 'admin' 
                          ? selectedMessage.receiver_name 
                          : selectedMessage.sender_name}
                      </span>
                      <span className="ml-2 text-gray-400">
                        {new Date(selectedMessage.sent_at).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {selectedMessage.sender_type !== 'admin' && (
                      <button
                        onClick={handleReplyClick}
                        className="px-3 py-1.5 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        Reply
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage)}
                      className="px-3 py-1.5 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="prose max-w-none">
                    <p>{selectedMessage.body}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <h2 className="font-medium text-gray-700">
                    {messageFilter === 'inbox' 
                      ? 'Inbox' 
                      : messageFilter === 'sent' 
                        ? 'Sent Messages' 
                        : 'All Messages'}
                  </h2>
                </div>
                <DataTable
                  columns={columns}
                  data={filteredMessages}
                  onRowClick={handleViewMessage}
                  onDelete={handleDeleteMessage}
                  searchable={true}
                  pagination={true}
                  itemsPerPage={10}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
