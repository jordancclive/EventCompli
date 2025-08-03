import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, ClipboardCheckIcon, UsersIcon, BellIcon, CheckCircleIcon, TentIcon, DropletIcon, FlameIcon, TruckIcon, ZapIcon, UserIcon, BuildingIcon, LandmarkIcon, MoreHorizontalIcon, DollarSignIcon, ScaleIcon, MessageCircleIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function Home({
  toggleAuth
}) {
  const navigate = useNavigate();
  const handleSignUp = () => {
    toggleAuth();
    navigate('/dashboard');
  };
  return <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <p className="text-lg text-gray-700 mb-3">
                Before an incident happens at your event,
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                Let CompliBot help you not get sued.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Automated and accurate vendor compliance checking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <Button variant="accent" onClick={handleSignUp} className="px-8 py-3 text-base">
                    Sign Up Free
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    *Small charge for vendors
                  </p>
                </div>
                <div>
                  <Button variant="outline" onClick={toggleAuth} className="px-8 py-3 text-base">
                    Sign In
                  </Button>
                  <p className="text-sm text-transparent mt-2">
                    &nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/complibotfull.png" alt="CompliBot" className="w-96 h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>
      {/* Feature Cards Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <ClipboardCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Vendor Document Uploading
              </h3>
              <p className="text-gray-600 text-sm">
                Easily collect and organize insurance certificates, permits, and
                other required documents from vendors.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="text-blue-600">Automated</span> Compliance
                Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Get automated readings on vendor insurance documents.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <BellIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="text-blue-600">Automated</span> Vendor
                Reminders
              </h3>
              <p className="text-gray-600 text-sm">
                Set up automatic reminders for vendors about upcoming deadlines
                and missing documentation.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start mb-3">
                <MessageCircleIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Oversee Vendor Compliance
              </h3>
              <p className="text-gray-600 text-sm">
                Send personalized messages to vendors about specific areas of
                non-compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Risk Awareness Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            When things go wrong at your event, <em>you're</em> the one they
            sue.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-700 rounded-lg p-8 border-t-4 border-blue-500">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                An incident happens.
              </h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start">
                  <DropletIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Vendor spills drink, attendee slips</span>
                </li>
                <li className="flex items-start">
                  <FlameIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Vendor's propane tank explodes</span>
                </li>
                <li className="flex items-start">
                  <ZapIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Short circuit causes shock or fire</span>
                </li>
                <li className="flex items-start">
                  <TentIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>Tent blows over and breaks a kid's arm</span>
                </li>
                <li className="flex items-start">
                  <TruckIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                  <span>
                    Vendor backs a truck into the venue's loading dock
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-700 rounded-lg p-8 border-t-4 border-blue-500">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Victim sues:
              </h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center">
                  <UserIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>Vendor</span>
                </li>
                <li className="flex items-center">
                  <BuildingIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>Venue</span>
                </li>
                <li className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>Sponsors</span>
                </li>
                <li className="flex items-center">
                  <LandmarkIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>City</span>
                </li>
                <li className="flex items-center">
                  <MoreHorizontalIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>etc</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-700 rounded-lg p-8 border-t-4 border-blue-500">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                The lawsuit is redirected to you.
              </h3>
              <div className="text-blue-100 mb-4">
                <p className="mb-2">
                  Even if your agreement with the non-compliant vendor says
                  they're responsible, actually{' '}
                  <span className="font-bold text-white">you are</span>.
                </p>
              </div>
              <div className="text-blue-100">
                <p>
                  You're the one who let them into the event without compliant
                  insurance, so the lawsuit will be directed to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="mb-2">
            <img src="/CompliBot3.png" alt="CompliBot" className="h-auto w-40 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to let CompliBot track your vendor compliance?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div>
              <Button variant="accent" onClick={handleSignUp} className="px-8 py-3 text-base">
                Sign Up Free
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                *Small charge for vendors
              </p>
            </div>
            <div>
              <Button variant="outline" onClick={toggleAuth} className="px-8 py-3 text-base">
                Sign In
              </Button>
              <p className="text-sm text-transparent mt-2">
                &nbsp;
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <img src="/CompliBotIconWhite.svg" alt="CompliBot" className="h-10 w-auto mr-3" />
                <span className="text-xl font-bold">EventCompli</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Simple, secure vendor compliance management powered by CompliBot
                technology.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} EventCompli. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>;
}