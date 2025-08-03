import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, CalendarIcon, CheckCircleIcon, ClockIcon, ArchiveIcon, ChevronRightIcon, BarChart3Icon, AlertCircleIcon, LinkIcon, ExternalLinkIcon, UserPlusIcon, ClipboardCopyIcon, ActivityIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  // Sample events data for demonstration
  const upcomingEvents = [{
    id: 1,
    name: 'Summer Farmers Market 2023',
    dates: 'Jun 15 - Sep 30, 2023',
    location: 'Central Park',
    complianceRate: 85,
    totalVendors: 40,
    compliantVendors: 34,
    maxVendors: 50,
    isPublic: true,
    icon: <CalendarIcon className="h-5 w-5 text-teal-600" />
  }, {
    id: 2,
    name: 'Tech Conference 2023',
    dates: 'Aug 10 - Aug 12, 2023',
    location: 'Convention Center',
    complianceRate: 62,
    totalVendors: 25,
    compliantVendors: 16,
    maxVendors: 25,
    isPublic: false,
    icon: <CalendarIcon className="h-5 w-5 text-blue-600" />
  }, {
    id: 3,
    name: 'Holiday Craft Fair',
    dates: 'Dec 1 - Dec 15, 2023',
    location: 'Downtown Mall',
    complianceRate: 40,
    totalVendors: 30,
    compliantVendors: 12,
    maxVendors: 0,
    isPublic: true,
    icon: <CalendarIcon className="h-5 w-5 text-indigo-600" />
  }];
  const pastEvents = [{
    id: 4,
    name: 'Spring Food Festival',
    dates: 'Apr 5 - Apr 7, 2023',
    location: 'Riverside Park',
    complianceRate: 92,
    totalVendors: 28,
    compliantVendors: 26,
    maxVendors: 30,
    isPublic: true,
    icon: <ArchiveIcon className="h-5 w-5 text-green-600" />
  }, {
    id: 5,
    name: 'Winter Market 2022',
    dates: 'Dec 10 - Dec 24, 2022',
    location: 'City Square',
    complianceRate: 78,
    totalVendors: 45,
    compliantVendors: 35,
    maxVendors: 45,
    isPublic: false,
    icon: <ArchiveIcon className="h-5 w-5 text-purple-600" />
  }];
  // Compliance alerts
  const complianceAlerts = [{
    id: 1,
    message: '6 vendors have expiring insurance in the next 30 days',
    event: 'Summer Farmers Market 2023',
    severity: 'warning'
  }, {
    id: 2,
    message: '3 vendors have incomplete documentation',
    event: 'Tech Conference 2023',
    severity: 'danger'
  }, {
    id: 3,
    message: '8 new vendor applications awaiting review',
    event: 'Holiday Craft Fair',
    severity: 'info'
  }];
  const copyToClipboard = eventName => {
    const portalUrl = `eventcompli.com/portal/${eventName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(portalUrl);
    // In a real app, you would show a toast notification here
    alert(`Portal link copied: ${portalUrl}`);
  };
  // Determine vendor limit status text
  const getVendorLimitText = event => {
    if (event.maxVendors === 0) return 'No limit';
    if (event.totalVendors >= event.maxVendors) return 'Limit reached';
    return `Limit of ${event.maxVendors}`;
  };
  // Check if event has reached vendor limit
  const hasReachedLimit = event => {
    return event.maxVendors > 0 && event.totalVendors >= event.maxVendors;
  };
  return <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Dashboard</h1>
          <p className="text-gray-600">
            Manage your events and monitor vendor compliance
          </p>
        </div>
        <Link to="/create-event">
          <Button variant="primary" className="mt-4 md:mt-0 flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>
      {/* Compliance Overview Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Compliance Overview
          </h2>
          <Button variant="outline" className="text-sm px-3 py-1 h-auto">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Overall Compliance</p>
                <p className="text-2xl font-bold text-gray-900">76%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-md">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-xs text-gray-500 font-medium">Vendors</div>
                <div></div>
                <div></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="flex items-center">
                  <span className="text-xs mr-2">Compliant</span>
                  <div className="w-20 h-3 bg-blue-500 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">94</div>
                <div></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <span className="text-xs mr-2">Non-compliant</span>
                  <div className="w-10 h-3 bg-red-500 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">29</div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  COIs Needing Renewal
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-md">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-xs text-gray-500 font-medium">
                  Reminders Sent
                </div>
                <div></div>
                <div></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="flex items-center">
                  <span className="text-xs mr-2">Expired</span>
                  <div className="w-8 h-3 bg-red-500 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">5</div>
                <div></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <span className="text-xs mr-2">&lt;7 Days Left</span>
                  <div className="w-12 h-3 bg-orange-400 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">7</div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  New Registration Activity
                </p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-md">
                <ActivityIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-xs text-gray-500 font-medium">
                  Registrations
                </div>
                <div></div>
                <div></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="flex items-center">
                  <span className="text-xs mr-2">New</span>
                  <div className="w-16 h-3 bg-blue-500 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">12</div>
                <div className="text-xs text-blue-600 font-medium">
                  <Link to="/vendors">View</Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <span className="text-xs mr-2">Updated</span>
                  <div className="w-8 h-3 bg-blue-500 rounded-sm"></div>
                </div>
                <div className="text-xs font-medium">6</div>
                <div className="text-xs text-blue-600 font-medium">
                  <Link to="/vendors">View</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Events Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('upcoming')}>
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button className={`py-4 px-1 text-sm font-medium border-b-2 ${activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('past')}>
              Past Events ({pastEvents.length})
            </button>
          </nav>
        </div>
        <div>
          {activeTab === 'upcoming' ? upcomingEvents.length > 0 ? <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date(s)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Vendors
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compliant %
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor Invitation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingEvents.map(event => <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/event/${event.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            {event.name}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {event.location}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.dates}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {event.totalVendors}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getVendorLimitText(event)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden mr-2">
                              <div className={`h-full rounded-full ${event.complianceRate > 80 ? 'bg-green-500' : event.complianceRate > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                        width: `${event.complianceRate}%`
                      }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {event.complianceRate}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {event.compliantVendors}/{event.totalVendors}{' '}
                            vendors
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {!hasReachedLimit(event) && (event.isPublic ? <Button variant="outline" size="sm" className="flex items-center" onClick={() => copyToClipboard(event.name)}>
                                <ClipboardCopyIcon className="h-3.5 w-3.5 mr-1" />
                                Copy Portal Link
                              </Button> : <Link to={`/invite-vendors/${event.name}`}>
                                <Button variant="primary" size="sm" className="flex items-center">
                                  <UserPlusIcon className="h-3.5 w-3.5 mr-1" />
                                  Invite Vendor
                                </Button>
                              </Link>)}
                          {hasReachedLimit(event) && <span className="text-xs text-gray-500">
                              Limit reached
                            </span>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div> : <div className="bg-gray-50 p-8 rounded-md text-center">
                <div className="flex justify-center mb-4">
                  <CalendarIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  You don't have any upcoming events scheduled. Create your
                  first event to get started.
                </p>
                <Link to="/create-event">
                  <Button variant="primary">Create Event</Button>
                </Link>
              </div> : pastEvents.length > 0 ? <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date(s)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Vendors
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compliant %
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastEvents.map(event => <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/event/${event.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {event.name}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {event.location}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.dates}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {event.totalVendors}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getVendorLimitText(event)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden mr-2">
                            <div className={`h-full rounded-full ${event.complianceRate > 80 ? 'bg-green-500' : event.complianceRate > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                        width: `${event.complianceRate}%`
                      }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {event.complianceRate}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.compliantVendors}/{event.totalVendors} vendors
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link to={`/event/${event.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <ExternalLinkIcon className="h-3.5 w-3.5 mr-1" />
                            View Report
                          </Button>
                        </Link>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="bg-gray-50 p-8 rounded-md text-center">
              <div className="flex justify-center mb-4">
                <ArchiveIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No past events
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                You don't have any past events. Once your events are complete,
                they'll appear here for your reference.
              </p>
            </div>}
        </div>
      </section>
    </main>;
}
// UsersIcon component for the dashboard
function UsersIcon({
  className
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>;
}