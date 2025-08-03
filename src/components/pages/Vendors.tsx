import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon, PlusIcon, ChevronDownIcon, DownloadIcon, BookmarkIcon, MoreHorizontalIcon, UserPlusIcon } from 'lucide-react';
import { Button } from '../ui/Button';
// Sample vendor data for demonstration
const sampleVendors = [{
  id: '1',
  name: 'Mountain Coffee Roasters',
  type: 'Food Trucks',
  event: 'Summer Food Festival 2023',
  status: 'compliant',
  lastUpdated: '2023-06-15',
  email: 'info@mountaincoffee.com'
}, {
  id: '2',
  name: 'Artisan Jewelry Designs',
  type: 'Handmade Crafts (jewelry, candles, soaps)',
  event: 'Craft Fair 2023',
  status: 'pending',
  lastUpdated: '2023-06-10',
  email: 'contact@artisanjewelry.com'
}, {
  id: '3',
  name: 'Bounce-A-Lot Inflatables',
  type: 'Bounce Houses / Inflatables',
  event: 'County Fair 2023',
  status: 'non-compliant',
  lastUpdated: '2023-06-05',
  email: 'info@bouncealot.com'
}, {
  id: '4',
  name: 'Local Honey Farm',
  type: 'Packaged Food Sellers (jams, baked goods)',
  event: 'Farmers Market',
  status: 'compliant',
  lastUpdated: '2023-06-12',
  email: 'honey@localfarm.com'
}, {
  id: '5',
  name: 'Sound Solutions',
  type: 'Electricians / Audio-Visual Techs',
  event: 'Music Festival 2023',
  status: 'pending',
  lastUpdated: '2023-06-08',
  email: 'tech@soundsolutions.com'
}, {
  id: '6',
  name: 'Craft Beer Garden',
  type: 'Alcohol Vendors / Beer Gardens',
  event: 'Summer Food Festival 2023',
  status: 'non-compliant',
  lastUpdated: '2023-06-02',
  email: 'events@craftbeer.com'
}, {
  id: '7',
  name: 'Sunshine Face Painting',
  type: 'Face Painters / Henna Artists',
  event: 'County Fair 2023',
  status: 'compliant',
  lastUpdated: '2023-06-14',
  email: 'art@sunshinepainting.com'
}];
export function Vendors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  // Filter vendors based on search and filters
  const filteredVendors = sampleVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || vendor.event === eventFilter;
    const matchesType = typeFilter === 'all' || vendor.type === typeFilter;
    return matchesSearch && matchesStatus && matchesEvent && matchesType;
  });
  // Get unique events and vendor types for filter dropdowns
  const events = [...new Set(sampleVendors.map(vendor => vendor.event))];
  const vendorTypes = [...new Set(sampleVendors.map(vendor => vendor.type))];
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
  return <main className="flex-1 px-6 py-8">
      <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-600">
            Manage vendors and monitor compliance status
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0 flex items-center">
          <UserPlusIcon className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filters - Left Side */}
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
                <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Events</option>
                  {events.map((event, index) => <option key={index} value={event}>
                      {event}
                    </option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-32">
                  <option value="all">All Types</option>
                  {vendorTypes.map((type, index) => <option key={index} value={type}>
                      {type}
                    </option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            {/* Search - Right Side */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Search vendors by name or email..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
        {/* Vendor Table */}
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
                  Event
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
              {filteredVendors.length > 0 ? filteredVendors.map(vendor => <tr key={vendor.id} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{vendor.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {vendor.event}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={vendor.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vendor.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontalIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No vendors found matching your filters.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{filteredVendors.length}</span> of{' '}
            <span className="font-medium">{sampleVendors.length}</span> vendors
          </div>
          <div className="flex-1 flex justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
      </div>
    </main>;
}