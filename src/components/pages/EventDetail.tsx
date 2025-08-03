import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UsersIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, ArrowLeftIcon, DownloadIcon, FileTextIcon, ClipboardCopyIcon, UserPlusIcon, ChevronDownIcon, FilterIcon, SearchIcon, BarChart2Icon, TagIcon, MessageCircleIcon, ExternalLinkIcon, SettingsIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function EventDetail() {
  const {
    eventId
  } = useParams();
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorTypeFilter, setVendorTypeFilter] = useState('all');
  // Mock data for event details
  const eventData = {
    id: 1,
    name: 'Summer Farmers Market 2023',
    dates: 'Jun 15 - Sep 30, 2023',
    location: 'Central Park, New York',
    description: 'A vibrant weekly farmers market featuring local produce, artisanal foods, and handcrafted goods. Join us every Saturday throughout the summer and early fall.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    complianceRate: 85,
    totalVendors: 40,
    compliantVendors: 34,
    maxVendors: 50,
    isPublic: true,
    registrationType: 'open',
    vendorTypes: [{
      id: 1,
      name: 'Produce Vendor',
      count: 15
    }, {
      id: 2,
      name: 'Food Truck',
      count: 8
    }, {
      id: 3,
      name: 'Craft Vendor',
      count: 12
    }, {
      id: 4,
      name: 'Bakery',
      count: 5
    }],
    upcomingDates: ['Saturday, July 8, 2023 (8am - 2pm)', 'Saturday, July 15, 2023 (8am - 2pm)', 'Saturday, July 22, 2023 (8am - 2pm)']
  };
  // Mock data for vendors
  const vendors = [{
    id: 1,
    name: 'Green Valley Farms',
    type: 'Produce Vendor',
    email: 'contact@greenvalleyfarms.com',
    phone: '(555) 123-4567',
    status: 'compliant',
    documents: [{
      type: 'COI',
      status: 'approved',
      expiryDate: '2024-06-15'
    }, {
      type: 'W9',
      status: 'approved',
      expiryDate: null
    }],
    lastUpdated: '2023-06-10'
  }, {
    id: 2,
    name: 'Artisan Bread Co.',
    type: 'Bakery',
    email: 'info@artisanbread.com',
    phone: '(555) 234-5678',
    status: 'compliant',
    documents: [{
      type: 'COI',
      status: 'approved',
      expiryDate: '2023-12-20'
    }, {
      type: 'W9',
      status: 'approved',
      expiryDate: null
    }, {
      type: 'Health Permit',
      status: 'approved',
      expiryDate: '2024-01-15'
    }],
    lastUpdated: '2023-06-08'
  }, {
    id: 3,
    name: 'Mountain Coffee Roasters',
    type: 'Food Truck',
    email: 'hello@mountaincoffee.com',
    phone: '(555) 345-6789',
    status: 'pending',
    documents: [{
      type: 'COI',
      status: 'pending',
      expiryDate: null
    }, {
      type: 'W9',
      status: 'approved',
      expiryDate: null
    }, {
      type: 'Health Permit',
      status: 'approved',
      expiryDate: '2023-12-31'
    }],
    lastUpdated: '2023-06-12'
  }, {
    id: 4,
    name: 'Handmade Soaps',
    type: 'Craft Vendor',
    email: 'sales@handmadesoaps.com',
    phone: '(555) 456-7890',
    status: 'non-compliant',
    documents: [{
      type: 'COI',
      status: 'rejected',
      expiryDate: '2023-06-01',
      reason: 'Insufficient coverage'
    }, {
      type: 'W9',
      status: 'approved',
      expiryDate: null
    }],
    lastUpdated: '2023-06-05'
  }, {
    id: 5,
    name: 'Fresh Catch Seafood',
    type: 'Food Truck',
    email: 'orders@freshcatch.com',
    phone: '(555) 567-8901',
    status: 'compliant',
    documents: [{
      type: 'COI',
      status: 'approved',
      expiryDate: '2024-05-20'
    }, {
      type: 'W9',
      status: 'approved',
      expiryDate: null
    }, {
      type: 'Health Permit',
      status: 'approved',
      expiryDate: '2024-02-28'
    }],
    lastUpdated: '2023-06-15'
  }];
  // Filter vendors based on search term and filters
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchTerm === '' || vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    const matchesVendorType = vendorTypeFilter === 'all' || vendor.type === vendorTypeFilter;
    return matchesSearch && matchesStatus && matchesVendorType;
  });
  // Status badge component
  const StatusBadge = ({
    status
  }) => {
    if (status === 'compliant') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Compliant
        </span>;
    } else if (status === 'pending') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangleIcon className="h-3 w-3 mr-1" />
          Pending
        </span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Non-Compliant
        </span>;
    }
  };
  // Document status badge
  const DocumentStatusBadge = ({
    status
  }) => {
    if (status === 'approved') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Approved
        </span>;
    } else if (status === 'pending') {
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Pending
        </span>;
    } else {
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Rejected
        </span>;
    }
  };
  // Function to copy portal link to clipboard
  const copyPortalLink = () => {
    const portalUrl = `eventcompli.com/portal/${eventData.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(portalUrl);
    alert(`Portal link copied: ${portalUrl}`);
  };
  return <main className="flex-1 px-6 py-8">
      <div className="container mx-auto max-w-6xl">
      {/* Back button */}
      <div className="mb-6">
        <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Back to Events</span>
        </Link>
      </div>
      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-48 bg-cover bg-center" style={{
        backgroundImage: `url(${eventData.image})`
      }}>
          <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-6">
            <h1 className="text-3xl font-bold text-white">{eventData.name}</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{eventData.dates}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{eventData.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {eventData.totalVendors} vendors
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden mr-2">
                      <div className={`h-full rounded-full ${eventData.complianceRate > 80 ? 'bg-green-500' : eventData.complianceRate > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                      width: `${eventData.complianceRate}%`
                    }}></div>
                    </div>
                    <span className="text-sm font-medium">
                      {eventData.complianceRate}% compliant
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{eventData.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventData.isPublic && <Button variant="outline" className="flex items-center" onClick={copyPortalLink}>
                  <ClipboardCopyIcon className="h-4 w-4 mr-2" />
                  Copy Portal Link
                </Button>}
              <Link to={`/invite-vendors/${eventData.name}`}>
                <Button variant="primary" className="flex items-center">
                  <UserPlusIcon className="h-4 w-4 mr-2" />
                  Invite Vendors
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Event Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Event Content Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'vendors' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('vendors')}>
              Vendors
            </button>
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('documents')}>
              Documents
            </button>
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('settings')}>
              Settings
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'vendors' && <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
                  Event Vendors
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Link to={`/invite-vendors/${eventData.name}`}>
                    <Button variant="primary" className="flex items-center">
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Invite Vendor
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" placeholder="Search vendors by name or email..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">All Statuses</option>
                      <option value="compliant">Compliant</option>
                      <option value="pending">Pending</option>
                      <option value="non-compliant">Non-Compliant</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <select value={vendorTypeFilter} onChange={e => setVendorTypeFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">All Vendor Types</option>
                      {eventData.vendorTypes.map(type => <option key={type.id} value={type.name}>
                          {type.name}
                        </option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    More Filters
                  </button>
                </div>
              </div>
              {/* Vendors Table */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documents
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVendors.map(vendor => <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {vendor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {vendor.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {vendor.type}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            {vendor.documents.map((doc, index) => <div key={index} className="flex items-center">
                                <FileTextIcon className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                <span className="text-xs text-gray-600 mr-2">
                                  {doc.type}:
                                </span>
                                <DocumentStatusBadge status={doc.status} />
                              </div>)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={vendor.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vendor.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <ExternalLinkIcon className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <MessageCircleIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                  </table>
                </div>
                {filteredVendors.length === 0 && <div className="text-center py-8">
                    <p className="text-gray-500">
                      No vendors match your search criteria.
                    </p>
                  </div>}
              </div>
            </>}
          {activeTab === 'overview' && <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Event Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Vendor Compliance
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {eventData.complianceRate}%
                        </span>
                      </div>
                      <svg className="w-24 h-24" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={eventData.complianceRate > 80 ? '#10b981' : eventData.complianceRate > 60 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${eventData.complianceRate}, 100`} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-600 mb-1">
                        Compliant Vendors
                      </div>
                      <div className="text-2xl font-semibold">
                        {eventData.compliantVendors} / {eventData.totalVendors}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Compliant</span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round(eventData.compliantVendors / eventData.totalVendors * 100)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">Non-Compliant</span>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Vendor Breakdown
                  </h3>
                  <div className="space-y-4">
                    {eventData.vendorTypes.map(type => <div key={type.id} className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {type.name}
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {type.count}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{
                        width: `${type.count / eventData.totalVendors * 100}%`
                      }}></div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Vendors
                      </span>
                      <span className="text-lg font-semibold">
                        {eventData.totalVendors}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">
                        Vendor Limit
                      </span>
                      <span className="text-sm">
                        {eventData.maxVendors > 0 ? `${eventData.totalVendors} / ${eventData.maxVendors}` : 'No limit'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Upcoming Event Dates
                </h3>
                <div className="space-y-4">
                  {eventData.upcomingDates.map((date, index) => <div key={index} className="flex items-start">
                      <CalendarIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-900">{date}</p>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600">{eventData.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Registration Type
                    </h4>
                    <div className="flex items-center">
                      {eventData.isPublic ? <>
                          <TagIcon className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Open Registration</span>
                        </> : <>
                          <TagIcon className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Invite Only</span>
                        </>}
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mt-4 mb-2">
                      Portal Link
                    </h4>
                    <div className="flex items-center">
                      <input type="text" readOnly value={`eventcompli.com/portal/${eventData.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-500" />
                      <button onClick={copyPortalLink} className="ml-2 p-2 text-blue-600 hover:text-blue-800">
                        <ClipboardCopyIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'documents' && <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Event Documents
              </h2>
              <p className="text-gray-600 mb-6">
                View and manage all vendor documents for this event.
              </p>
              <div className="bg-gray-50 p-8 rounded-md text-center">
                <div className="flex justify-center mb-4">
                  <FileTextIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Documents View
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  This tab would show all documents related to this event,
                  including vendor insurance certificates, permits, and
                  agreements.
                </p>
                <Link to="/documents">
                  <Button variant="primary">Go to Documents</Button>
                </Link>
              </div>
            </div>}
          {activeTab === 'settings' && <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Event Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Manage event details, vendor requirements, and portal settings.
              </p>
              <div className="bg-gray-50 p-8 rounded-md text-center">
                <div className="flex justify-center mb-4">
                  <SettingsIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Settings View
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  This tab would allow you to edit event details, manage vendor
                  requirements, and customize the vendor portal.
                </p>
                <Button variant="primary">Edit Event Settings</Button>
              </div>
            </div>}
        </div>
      </div>
      </div>
    </main>;
}