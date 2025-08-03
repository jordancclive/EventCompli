import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-3 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="flex flex-col mr-3">
              <span className="text-lg font-bold">EventCompli</span>
              <span className="text-xs text-gray-400">powered by CompliBot</span>
            </div>
            <img 
              src="/CompliBotIconWhite.svg" 
              alt="CompliBot" 
              className="h-8 w-auto" 
            />
          </div>
          
          {/* Center - Copyright */}
          <div className="text-gray-400 text-sm text-center">
            <div>&copy; {new Date().getFullYear()} EventCompli. All rights reserved.</div>
            <div>
              <a href="#" className="hover:text-white">Privacy</a>,{' '}
              <a href="#" className="hover:text-white">Terms</a>, and{' '}
              <a href="#" className="hover:text-white">Security</a>.
            </div>
          </div>
          
          {/* Right side - Company links */}
          <div className="flex space-x-6 justify-end">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-sm"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-sm"
            >
              Blog
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}