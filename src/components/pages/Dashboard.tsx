import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, CheckCircleIcon, ClockIcon, ArchiveIcon, ChevronRightIcon, BarChart3Icon, AlertCircleIcon, LinkIcon, ExternalLinkIcon, UserPlusIcon, ClipboardCopyIcon, ActivityIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();
  
  // Data values for all dashboard metrics
  const dashboardData = {
    compliant: 94,
    nonCompliant: 29,
    expired: 5,
    expiringSoon: 7,
    newRegistrations: 12,
    updatedRegistrations: 6
  };
  
  // Find the maximum value across all metrics to set the scale
  const maxValue = Math.max(...Object.values(dashboardData));
  
  // Calculate proportional width for any value
  const getBarWidth = (value) => `${(value / maxValue) * 100}%`;
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
  return <main className="flex-1 px-6 py-8">
      <div className="container mx-auto max-w-6xl">
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home Dashboard</h1>
          <p className="text-gray-600">
            Monitor vendor compliance and manage your events
          </p>
        </div>
      </div>
      {/* Compliance Cards */}
      {/* Overall Compliance - Full Width */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Overall Compliance</h2>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-2xl font-bold text-gray-900">{Math.round((dashboardData.compliant / (dashboardData.compliant + dashboardData.nonCompliant)) * 100)}%</p>
            <div className="bg-green-100 p-2 rounded-md">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center mb-3">
            <div></div>
            <div className="text-sm text-gray-500 font-medium text-right">Vendors</div>
            <div></div>
            <div></div>
          </div>
          <div className="space-y-1">
            <div 
              className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
              onClick={() => navigate('/vendors?filter=compliant')}
            >
              <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">Compliant</span>
              <div className="text-sm font-medium text-right">{dashboardData.compliant}</div>
              <div className="h-4 bg-blue-500 rounded-sm" style={{width: getBarWidth(dashboardData.compliant)}}></div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div 
              className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
              onClick={() => navigate('/vendors?filter=non-compliant')}
            >
              <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">Non-compliant</span>
              <div className="text-sm font-medium text-right">{dashboardData.nonCompliant}</div>
              <div className="h-4 bg-red-500 rounded-sm" style={{width: getBarWidth(dashboardData.nonCompliant)}}></div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Other Two Cards - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                COIs Needing Renewal
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.expired + dashboardData.expiringSoon}</p>
              <div className="bg-yellow-100 p-2 rounded-md">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center mb-3">
              <div></div>
              <div className="text-sm text-gray-500 font-medium text-right whitespace-nowrap">Reminders Sent</div>
              <div></div>
              <div></div>
            </div>
            <div className="space-y-1">
              <div 
                className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
                onClick={() => navigate('/documents?filter=expired')}
              >
                <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">Expired</span>
                <div className="text-sm font-medium text-right">{dashboardData.expired}</div>
                <div className="h-4 bg-red-500 rounded-sm" style={{width: getBarWidth(dashboardData.expired)}}></div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div 
                className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
                onClick={() => navigate('/documents?filter=expiring-soon')}
              >
                <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">&lt;7 Days Left</span>
                <div className="text-sm font-medium text-right">{dashboardData.expiringSoon}</div>
                <div className="h-4 bg-orange-400 rounded-sm" style={{width: getBarWidth(dashboardData.expiringSoon)}}></div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                New Registration Activity
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-2xl font-bold text-gray-900">{dashboardData.newRegistrations + dashboardData.updatedRegistrations}</p>
              <div className="bg-blue-100 p-2 rounded-md">
                <ActivityIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center mb-3">
              <div></div>
              <div className="text-sm text-gray-500 font-medium text-right">Registrations</div>
              <div></div>
              <div></div>
            </div>
            <div className="space-y-1">
              <div 
                className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
                onClick={() => navigate('/vendors?filter=new')}
              >
                <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">New</span>
                <div className="text-sm font-medium text-right">{dashboardData.newRegistrations}</div>
                <div className="h-4 bg-blue-500 rounded-sm" style={{width: getBarWidth(dashboardData.newRegistrations)}}></div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div 
                className="grid grid-cols-[90px_140px_1fr_24px] gap-4 items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded"
                onClick={() => navigate('/vendors?filter=updated')}
              >
                <span className="text-sm whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium">Updated</span>
                <div className="text-sm font-medium text-right">{dashboardData.updatedRegistrations}</div>
                <div className="h-4 bg-blue-500 rounded-sm" style={{width: getBarWidth(dashboardData.updatedRegistrations)}}></div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Events Section */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 pb-0">
          <div className="flex justify-between items-center py-4">
            <nav className="flex space-x-8">
              <button className={`py-4 px-1 text-lg font-semibold border-b-2 ${activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-900 hover:text-blue-600 hover:border-gray-300'}`} onClick={() => setActiveTab('upcoming')}>
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button className={`py-4 px-1 text-lg font-semibold border-b-2 ${activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-900 hover:text-blue-600 hover:border-gray-300'}`} onClick={() => setActiveTab('past')}>
                Past Events ({pastEvents.length})
              </button>
            </nav>
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder="Search events..." 
                />
              </div>
            </div>
          </div>
        </div>
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
      </section>
      </div>
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