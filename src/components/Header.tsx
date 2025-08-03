import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, PlusIcon } from 'lucide-react';
import { Button } from './ui/Button';
export function Header({
  isAuthenticated,
  toggleAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
              <div className="text-2xl font-bold mr-1.5 leading-none">
                <span className="text-blue-600">Event</span><span className="text-gray-900">Compli</span>
              </div>
              <img src="/CompliBotIcon.svg" alt="CompliBot" className="h-6 w-6" />
            </Link>
            {isAuthenticated && <nav className="hidden md:flex ml-10">
                <ul className="flex space-x-8">
                  <li>
                    <Link to="/dashboard" className={`text-sm font-medium ${location.pathname === '/dashboard' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendors" className={`text-sm font-medium ${location.pathname === '/vendors' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                      Vendors
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents" className={`text-sm font-medium ${location.pathname === '/documents' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                      Documents
                    </Link>
                  </li>
                  <li>
                    <Link to="/activity-log" className={`text-sm font-medium ${location.pathname === '/activity-log' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                      Activity Log
                    </Link>
                  </li>
                </ul>
              </nav>}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? <>
                <button onClick={toggleAuth} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Sign Out
                </button>
                <Link to="/create-event">
                  <Button variant="primary" className="flex items-center">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              </> : <>
                <Button variant="outline" onClick={toggleAuth} className="px-8 py-3 text-base">
                  Sign In
                </Button>
                <Button variant="accent" onClick={toggleAuth} className="px-8 py-3 text-base">
                  Sign Up Free
                </Button>
              </>}
          </div>
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {mobileMenuOpen ? <XIcon className="h-6 w-6 text-gray-700" /> : <MenuIcon className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            {isAuthenticated ? <nav className="mb-4">
                <ul className="space-y-4">
                  <li>
                    <Link to="/dashboard" className={`block text-sm font-medium ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendors" className={`block text-sm font-medium ${location.pathname === '/vendors' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                      Vendors
                    </Link>
                  </li>
                  <li>
                    <Link to="/documents" className={`block text-sm font-medium ${location.pathname === '/documents' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                      Documents
                    </Link>
                  </li>
                  <li>
                    <Link to="/activity-log" className={`block text-sm font-medium ${location.pathname === '/activity-log' ? 'text-blue-600' : 'text-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                      Activity Log
                    </Link>
                  </li>
                </ul>
              </nav> : null}
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? <>
                  <Link to="/create-event" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full flex items-center justify-center">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={toggleAuth} className="w-full">
                    Sign Out
                  </Button>
                </> : <>
                  <Button variant="outline" onClick={toggleAuth} className="w-full">
                    Sign In
                  </Button>
                  <Button variant="accent" onClick={toggleAuth} className="w-full">
                    Sign Up Free
                  </Button>
                </>}
            </div>
          </div>}
      </div>
    </header>;
}