import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, DownloadIcon, FileTextIcon, FileIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, EyeIcon, ClockIcon, ChevronDownIcon, SlidersIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDocType, setFilterDocType] = useState('all');
  const [filterEvent, setFilterEvent] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  // Sample document data
  const documents = [{
    id: 1,
    name: 'Certificate of Insurance',
    vendor: 'Farm Fresh Produce',
    event: 'Summer Farmers Market 2023',
    type: 'COI',
    status: 'approved',
    date: '2023-05-15',
    expiryDate: '2024-05-15',
    notes: 'All requirements met',
    fileUrl: '#'
  }, {
    id: 2,
    name: 'W-9 Form',
    vendor: 'Farm Fresh Produce',
    event: 'Summer Farmers Market 2023',
    type: 'W9',
    status: 'approved',
    date: '2023-05-10',
    expiryDate: null,
    notes: 'Complete',
    fileUrl: '#'
  }, {
    id: 3,
    name: 'Certificate of Insurance',
    vendor: 'Artisan Crafts',
    event: 'Summer Farmers Market 2023',
    type: 'COI',
    status: 'rejected',
    date: '2023-05-18',
    expiryDate: '2024-05-18',
    notes: 'Missing additional insured endorsement',
    fileUrl: '#'
  }, {
    id: 4,
    name: 'Vendor Agreement',
    vendor: 'Artisan Crafts',
    event: 'Summer Farmers Market 2023',
    type: 'Agreement',
    status: 'pending',
    date: '2023-05-18',
    expiryDate: null,
    notes: 'Awaiting review',
    fileUrl: '#'
  }, {
    id: 5,
    name: 'Certificate of Insurance',
    vendor: 'Tech Solutions Inc',
    event: 'Tech Conference 2023',
    type: 'COI',
    status: 'approved',
    date: '2023-07-01',
    expiryDate: '2023-12-15',
    notes: 'Expiring soon',
    fileUrl: '#'
  }, {
    id: 6,
    name: 'Certificate of Insurance',
    vendor: 'Gourmet Food Truck',
    event: 'Holiday Craft Fair',
    type: 'COI',
    status: 'pending',
    date: '2023-10-05',
    expiryDate: '2024-10-05',
    notes: 'Under review',
    fileUrl: '#'
  }, {
    id: 7,
    name: 'Health Permit',
    vendor: 'Gourmet Food Truck',
    event: 'Holiday Craft Fair',
    type: 'Permit',
    status: 'approved',
    date: '2023-10-02',
    expiryDate: '2024-01-15',
    notes: 'County health department approved',
    fileUrl: '#'
  }, {
    id: 8,
    name: 'W-9 Form',
    vendor: 'Tech Solutions Inc',
    event: 'Tech Conference 2023',
    type: 'W9',
    status: 'approved',
    date: '2023-07-01',
    expiryDate: null,
    notes: 'Complete',
    fileUrl: '#'
  }];
  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    // Search term filter
    const matchesSearch = searchTerm === '' || doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || doc.event.toLowerCase().includes(searchTerm.toLowerCase());
    // Status filter
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    // Document type filter
    const matchesDocType = filterDocType === 'all' || doc.type === filterDocType;
    // Event filter
    const matchesEvent = filterEvent === 'all' || doc.event === filterEvent;
    return matchesSearch && matchesStatus && matchesDocType && matchesEvent;
  });
  // Get unique events for filter dropdown
  const events = [...new Set(documents.map(doc => doc.event))];
  // Get unique document types for filter dropdown
  const docTypes = [...new Set(documents.map(doc => doc.type))];
  // Status badge component
  const StatusBadge = ({
    status
  }) => {
    let bgColor, textColor, icon;
    switch (status) {
      case 'approved':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        icon = <CheckCircleIcon className="h-3.5 w-3.5 mr-1 text-green-600" />;
        break;
      case 'rejected':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        icon = <XCircleIcon className="h-3.5 w-3.5 mr-1 text-red-600" />;
        break;
      case 'pending':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        icon = <ClockIcon className="h-3.5 w-3.5 mr-1 text-yellow-600" />;
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        icon = <AlertCircleIcon className="h-3.5 w-3.5 mr-1 text-gray-600" />;
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>;
  };
  // Document type icon component
  const DocTypeIcon = ({
    type
  }) => {
    switch (type) {
      case 'COI':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case 'W9':
        return <FileTextIcon className="h-5 w-5 text-green-500" />;
      case 'Agreement':
        return <FileTextIcon className="h-5 w-5 text-purple-500" />;
      case 'Permit':
        return <FileTextIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  return <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">
            Manage vendor documents and compliance status
          </p>
        </div>
        <Button variant="primary" className="mt-4 md:mt-0 flex items-center">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search documents, vendors, or events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
            <ChevronDownIcon className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        {showFilters && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select id="statusFilter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label htmlFor="docTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select id="docTypeFilter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterDocType} onChange={e => setFilterDocType(e.target.value)}>
                <option value="all">All Document Types</option>
                {docTypes.map(type => <option key={type} value={type}>
                    {type}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="eventFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Event
              </label>
              <select id="eventFilter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filterEvent} onChange={e => setFilterEvent(e.target.value)}>
                <option value="all">All Events</option>
                {events.map(event => <option key={event} value={event}>
                    {event}
                  </option>)}
              </select>
            </div>
          </div>}
      </div>
      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Document Library
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredDocuments.length} documents
            </span>
            <Button variant="outline" size="sm" className="flex items-center">
              <div className="h-3.5 w-3.5 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.length > 0 ? filteredDocuments.map(doc => <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          <DocTypeIcon type={doc.type} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {doc.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doc.vendor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doc.event}</div>
                      <div className="text-xs text-gray-500">
                        Uploaded: {new Date(doc.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={doc.status} />
                      {doc.notes && <div className="text-xs text-gray-500 mt-1">
                          {doc.notes}
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doc.expiryDate ? <div>
                          <div className="text-sm text-gray-900">
                            {new Date(doc.expiryDate) < new Date() ? <span className="text-red-600 font-medium">
                                Expired
                              </span> : new Date(doc.expiryDate).toLocaleDateString()}
                          </div>
                          {new Date(doc.expiryDate) > new Date() && <div className="text-xs text-gray-500">
                              {Math.ceil((new Date(doc.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))}{' '}
                              days left
                            </div>}
                        </div> : <span className="text-xs text-gray-500">N/A</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <DownloadIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    No documents found matching your search criteria
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination - simplified for demo */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredDocuments.length}</span>{' '}
                of{' '}
                <span className="font-medium">{filteredDocuments.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button disabled className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button disabled className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>;
}