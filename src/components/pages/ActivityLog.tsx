import { useState } from 'react';
import { SearchIcon, CalendarIcon, UserIcon, FileTextIcon, MailIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, DownloadIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';

// Activity types
const ACTIVITY_TYPES: Record<string, { icon: any, color: string, bg: string }> = {
  event: { icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
  vendor: { icon: UserIcon, color: 'text-green-600', bg: 'bg-green-100' },
  document: { icon: FileTextIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
  email: { icon: MailIcon, color: 'text-orange-600', bg: 'bg-orange-100' },
  system: { icon: AlertCircleIcon, color: 'text-gray-600', bg: 'bg-gray-100' }
};

// Sample activity data
const SAMPLE_ACTIVITIES = [
  {
    id: 1,
    type: 'document',
    action: 'Document Uploaded',
    description: 'ABC Catering uploaded Certificate of Insurance',
    user: 'ABC Catering (Vendor)',
    event: 'Summer Farmers Market 2023',
    timestamp: '2023-08-02T19:45:00Z',
    status: 'completed'
  },
  {
    id: 2,
    type: 'email',
    action: 'Reminder Sent',
    description: 'Insurance renewal reminder sent to XYZ Food Truck',
    user: 'System',
    event: 'Summer Farmers Market 2023',
    timestamp: '2023-08-02T18:30:00Z',
    status: 'completed'
  },
  {
    id: 3,
    type: 'vendor',
    action: 'Vendor Registered',
    description: 'New vendor registration completed',
    user: 'DEF Electronics (Vendor)',
    event: 'Tech Conference 2023',
    timestamp: '2023-08-02T17:15:00Z',
    status: 'completed'
  },
  {
    id: 4,
    type: 'event',
    action: 'Event Created',
    description: 'New event created with vendor requirements',
    user: 'John Smith (Admin)',
    event: 'Holiday Craft Fair',
    timestamp: '2023-08-02T16:00:00Z',
    status: 'completed'
  },
  {
    id: 5,
    type: 'document',
    action: 'Document Rejected',
    description: 'Business license rejected - expired document',
    user: 'GHI Services (Vendor)',
    event: 'Tech Conference 2023',
    timestamp: '2023-08-02T15:30:00Z',
    status: 'failed'
  },
  {
    id: 6,
    type: 'email',
    action: 'Invitation Sent',
    description: 'Vendor invitation sent to potential participants',
    user: 'System',
    event: 'Holiday Craft Fair',
    timestamp: '2023-08-02T14:45:00Z',
    status: 'completed'
  },
  {
    id: 7,
    type: 'vendor',
    action: 'Profile Updated',
    description: 'Vendor updated contact information and business details',
    user: 'JKL Consulting (Vendor)',
    event: 'Summer Farmers Market 2023',
    timestamp: '2023-08-02T13:20:00Z',
    status: 'completed'
  },
  {
    id: 8,
    type: 'system',
    action: 'Compliance Check',
    description: 'Automated compliance verification completed',
    user: 'CompliBot System',
    event: 'Tech Conference 2023',
    timestamp: '2023-08-02T12:00:00Z',
    status: 'completed'
  },
  {
    id: 9,
    type: 'document',
    action: 'Document Approved',
    description: 'Certificate of Insurance approved and verified',
    user: 'MNO Catering (Vendor)',
    event: 'Summer Farmers Market 2023',
    timestamp: '2023-08-02T11:30:00Z',
    status: 'completed'
  },
  {
    id: 10,
    type: 'event',
    action: 'Event Published',
    description: 'Event made public and vendor registration opened',
    user: 'Sarah Johnson (Admin)',
    event: 'Summer Farmers Market 2023',
    timestamp: '2023-08-02T10:15:00Z',
    status: 'completed'
  }
];

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Filter activities based on search and filters
  const filteredActivities = SAMPLE_ACTIVITIES.filter(activity => {
    const matchesSearch = !searchTerm || 
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.event.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || activity.type === selectedType;
    const matchesEvent = !selectedEvent || activity.event === selectedEvent;
    const matchesStatus = !selectedStatus || activity.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesEvent && matchesStatus;
  });

  // Get unique events for filter dropdown
  const uniqueEvents = [...new Set(SAMPLE_ACTIVITIES.map(a => a.event))];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XIcon className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircleIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const clearFilters = () => {
    setSelectedType('');
    setSelectedEvent('');
    setSelectedStatus('');
    setSearchTerm('');
  };

  return (
    <main className="flex-1 px-6 py-8">
      <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600">
            Browse or search a complete history of all activities across your events, vendors, and documents
          </p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          <Button variant="outline" className="flex items-center">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filters - Left Side */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="event">Events</option>
                  <option value="vendor">Vendors</option>
                  <option value="document">Documents</option>
                  <option value="email">Emails</option>
                  <option value="system">System</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Events</option>
                  {uniqueEvents.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center"
              >
                Clear Filters
              </Button>
            </div>
            {/* Search - Right Side */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities, users, events, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User/Entity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => {
                const ActivityIcon = ACTIVITY_TYPES[activity.type]?.icon || AlertCircleIcon;
                const { date, time } = formatTimestamp(activity.timestamp);
                
                return (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${ACTIVITY_TYPES[activity.type]?.bg || 'bg-gray-100'}`}>
                          <ActivityIcon className={`h-4 w-4 ${ACTIVITY_TYPES[activity.type]?.color || 'text-gray-600'}`} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{activity.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{activity.event}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{date}</div>
                      <div className="text-sm text-gray-500">{time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(activity.status)}
                        <span className={`ml-2 text-sm ${
                          activity.status === 'completed' ? 'text-green-700' :
                          activity.status === 'failed' ? 'text-red-700' :
                          activity.status === 'pending' ? 'text-yellow-700' :
                          'text-gray-700'
                        }`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <AlertCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{filteredActivities.length}</span>{' '}
                of{' '}
                <span className="font-medium">{filteredActivities.length}</span>{' '}
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
      </div>
    </main>
  );
}