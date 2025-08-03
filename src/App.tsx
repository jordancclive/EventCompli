import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { EventCreationForm } from './components/EventCreationForm';
import { Home } from './components/pages/Home';
import { Dashboard } from './components/pages/Dashboard';
import { VendorTypeCreation } from './components/pages/VendorTypeCreation';
import { Vendors } from './components/pages/Vendors';
import { InviteVendors } from './components/pages/InviteVendors';
import { Documents } from './components/pages/Documents';
import { VendorRegistration } from './components/pages/VendorRegistration';
import { EventDetail } from './components/pages/EventDetail';
import { Head } from './components/Head';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // For demo purposes - toggles auth state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    // This effect will run when authentication state changes
  }, [isAuthenticated]);
  return <BrowserRouter>
      <Head />
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Header isAuthenticated={isAuthenticated} toggleAuth={toggleAuth} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home toggleAuth={toggleAuth} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="/create-event" element={isAuthenticated ? <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                  <EventCreationForm />
                </main> : <Navigate to="/" replace />} />
          <Route path="/vendor-types/create" element={isAuthenticated ? <VendorTypeCreation /> : <Navigate to="/" replace />} />
          <Route path="/vendors" element={isAuthenticated ? <Vendors /> : <Navigate to="/" replace />} />
          <Route path="/documents" element={isAuthenticated ? <Documents /> : <Navigate to="/" replace />} />
          <Route path="/invite-vendors/:eventId" element={isAuthenticated ? <InviteVendors /> : <Navigate to="/" replace />} />
          <Route path="/vendor-registration/:eventId" element={<VendorRegistration />} />
          <Route path="/event/:eventId" element={isAuthenticated ? <EventDetail /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>;
}