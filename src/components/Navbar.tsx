import React, { useState, useEffect } from 'react';
import { PageView } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { COUNTRY_SECTIONS, CountrySection } from '../data/countries.ts';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  ArrowUpRight,
  Globe,
  Search,
  MapPin,
  Check,
  User,
  Briefcase,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, params?: any) => void;
  onOpenDbStatus?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenDbStatus }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [mobileCountrySearch, setMobileCountrySearch] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');
  const [candidateProfile, setCandidateProfile] = useState<any>(null);

  useEffect(() => {
    const checkProfile = () => {
      try {
        const stored = localStorage.getItem('careerspring_user_profile');
        if (stored) {
          setCandidateProfile(JSON.parse(stored));
        } else if (user) {
          setCandidateProfile({
            name: user.name,
            email: user.email,
            targetRole: user.role === 'employer' ? 'Hiring Executive' : 'Candidate',
          });
        } else {
          setCandidateProfile(null);
        }
      } catch {
        setCandidateProfile(null);
      }
    };
    checkProfile();
    window.addEventListener('storage', checkProfile);
    window.addEventListener('careerspring_profile_updated', checkProfile);
    return () => {
      window.removeEventListener('storage', checkProfile);
      window.removeEventListener('careerspring_profile_updated', checkProfile);
    };
  }, [user]);

  const hasProfile = Boolean(user || candidateProfile);
  const displayName = user?.name || candidateProfile?.name || 'Candidate';
  const displayEmail = user?.email || candidateProfile?.email || '';
  const displayRole = user?.role === 'employer' ? 'Employer' : (candidateProfile?.targetRole || 'Candidate');

  const navLinks: { label: string; page: PageView; index: string; badge?: string }[] = [
    { label: 'Explore Jobs', page: 'jobs', index: '01', badge: '111 Roles' },
    { label: 'Sector Practices', page: 'industries', index: '02' },
    { label: 'About Our Firm', page: 'about', index: '03' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCountryDropdownOpen(false);
  };

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountryName(countryName);
    setCountryDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('jobs', { location: countryName === 'Remote / Global' ? 'Remote' : countryName });
  };

  const filteredCountries = COUNTRY_SECTIONS.filter((c) => {
    if (!countrySearchQuery.trim()) return true;
    const q = countrySearchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.cities.some((city) => city.toLowerCase().includes(q))
    );
  });

  const filteredMobileCountries = COUNTRY_SECTIONS.filter((c) => {
    if (!mobileCountrySearch.trim()) return true;
    const q = mobileCountrySearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.cities.some((city) => city.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Official CAREERSPRING Brand Logo & Name */}
            <div className="flex items-center justify-start min-w-0 shrink-0">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none min-w-0 cursor-pointer"
              >
                <img
                  src="/logo-icon.png"
                  alt="CareerSpring Logo"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="flex flex-col justify-center min-w-0">
                  <div className="font-sans text-lg sm:text-2xl tracking-tight uppercase font-black leading-none text-slate-900 flex items-center">
                    <span>CAREER</span>
                    <span className="text-[#FF5500]">SPRING</span>
                  </div>
                  <span className="hidden sm:block text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase font-bold text-slate-500 mt-1 truncate">
                    Jobs &bull; Talent &bull; Opportunities
                  </span>
                </div>
              </button>
            </div>

            {/* Right Corner: Nav Buttons & Actions */}
            <div className="flex items-center justify-end gap-5 lg:gap-8 ml-auto">
              <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs tracking-wider uppercase font-sans font-semibold text-slate-600">
                {/* Jobs */}
                <button
                  onClick={() => handleNavClick('jobs')}
                  className={`transition-colors whitespace-nowrap relative py-2 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer ${
                    currentPage === 'jobs' ? 'text-slate-900 font-bold' : 'text-slate-600'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jobs</span>
                  {currentPage === 'jobs' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
                  )}
                </button>

                {/* Country Sections Dropdown Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className={`transition-colors whitespace-nowrap relative py-2 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer ${
                      countryDropdownOpen ? 'text-slate-900 font-bold' : 'text-slate-600'
                    }`}
                    aria-expanded={countryDropdownOpen}
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Countries</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        countryDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'
                      }`}
                    />
                    {countryDropdownOpen && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
                    )}
                  </button>
                </div>

                {/* Sector Practices */}
                <button
                  onClick={() => handleNavClick('industries')}
                  className={`transition-colors whitespace-nowrap relative py-2 hover:text-slate-900 cursor-pointer ${
                    currentPage === 'industries' ? 'text-slate-900 font-bold' : 'text-slate-600'
                  }`}
                >
                  <span>Sectors</span>
                  {currentPage === 'industries' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
                  )}
                </button>

                {/* About */}
                <button
                  onClick={() => handleNavClick('about')}
                  className={`transition-colors whitespace-nowrap relative py-2 hover:text-slate-900 cursor-pointer ${
                    currentPage === 'about' ? 'text-slate-900 font-bold' : 'text-slate-600'
                  }`}
                >
                  <span>About</span>
                  {currentPage === 'about' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900" />
                  )}
                </button>
              </nav>

              {/* Right: Actions / Mobile Controls */}
              <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              {/* Profile Icon & Dropdown */}
              {hasProfile && (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 rounded-lg transition-all shadow-xs group cursor-pointer"
                    title="View Profile"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[11px] uppercase shadow-2xs">
                        {displayName.charAt(0) || <User className="w-3.5 h-3.5" />}
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-2 ring-white" />
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="max-w-[110px] truncate font-bold text-slate-900 leading-tight">
                        {displayName}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold truncate max-w-[110px]">
                        {displayRole}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu (Only active when candidate has a profile) */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 z-50 text-xs font-sans animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 pb-3 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm uppercase shrink-0 shadow-xs">
                          {displayName.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm truncate">{displayName}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Profile Active" />
                          </div>
                          {displayEmail && <p className="text-[11px] text-slate-500 truncate">{displayEmail}</p>}
                          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[9.5px] font-bold rounded uppercase tracking-wider">
                            {displayRole}
                          </span>
                        </div>
                      </div>

                      <div className="p-2 space-y-0.5">

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            handleNavClick('jobs');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-800 font-medium flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-slate-500" />
                            <span>Explore Opportunities</span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>

                      <div className="border-t border-slate-100 my-1 mx-2" />

                      <div className="px-2">
                        <button
                          onClick={() => {
                            logout();
                            localStorage.removeItem('careerspring_user_profile');
                            setCandidateProfile(null);
                            window.dispatchEvent(new CustomEvent('careerspring_profile_updated', { detail: null }));
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-rose-50 rounded-lg flex items-center justify-between text-rose-600 font-semibold"
                        >
                          <span>Switch / Reset Profile</span>
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Quick "Jobs" Button */}
              <button
                onClick={() => handleNavClick('jobs')}
                className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                <span>Jobs</span>
              </button>

              {/* Mobile Hamburger */}
              <div className="flex md:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 text-slate-800 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Desktop Country Sections Dropdown Mega-Panel */}
        {countryDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8">
              {/* Header and Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-xs font-sans uppercase tracking-wider text-slate-500 font-bold">
                      Global Requisitions
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl text-slate-900 font-bold mt-1">
                    Search Jobs by Country
                  </h3>
                  <p className="text-xs font-sans text-slate-500 mt-0.5">
                    Select a jurisdiction to explore verified executive, engineering, and commercial mandates.
                  </p>
                </div>

                {/* Country Search Filter */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                    placeholder="Filter country or city (e.g. London, Germany, Dubai)..."
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900 transition-colors"
                  />
                  {countrySearchQuery && (
                    <button
                      onClick={() => setCountrySearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Country Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 max-h-[460px] overflow-y-auto pr-1">
                {filteredCountries.map((country) => {
                  const isSelected =
                    selectedCountryName.toLowerCase() === country.name.toLowerCase();
                  return (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.name)}
                      className={`text-left p-4.5 border rounded-xl transition-all group flex flex-col justify-between ${isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/60 shadow-xs'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl" role="img" aria-label={country.name}>
                            {country.flag}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-sans text-base text-slate-900 group-hover:text-blue-600 transition-colors font-bold">
                                {country.name}
                              </span>
                              {isSelected && (
                                <span className="inline-flex items-center text-[10px] text-blue-600 font-bold bg-blue-100/70 px-1.5 py-0.5 rounded">
                                  <Check className="w-3 h-3 mr-0.5" /> Selected
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-sans text-slate-500 font-medium">
                              {country.badge}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 rounded-md whitespace-nowrap">
                          {country.mandatesCount} Roles
                        </span>
                      </div>

                      {/* Cities & Quick Explore */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-slate-500">
                        <span className="truncate max-w-[200px]">
                          {country.cities.join(' · ')}
                        </span>
                        <span className="text-slate-900 text-xs font-semibold flex items-center gap-1 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                          <span>Search</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Showing verified opportunities across 9 international economic hubs.</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedCountryName('');
                      setCountryDropdownOpen(false);
                      onNavigate('jobs', { location: '' });
                    }}
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View All Global Requisitions (Clear Location)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCountryDropdownOpen(false)}
                    className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for closing dropdowns */}
      {countryDropdownOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px]"
          onClick={() => setCountryDropdownOpen(false)}
        />
      )}
      {userDropdownOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => setUserDropdownOpen(false)}
        />
      )}

      {/* Clean White Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo-icon.png"
                alt="CareerSpring Logo"
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-sans text-lg font-black uppercase text-slate-900 leading-none">
                  CAREER<span className="text-[#FF5500]">SPRING</span>
                </span>
                <span className="text-[7.5px] tracking-[0.2em] uppercase font-bold text-slate-500 mt-0.5">
                  Jobs &bull; Talent &bull; Opportunities
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Profile Card */}
          {hasProfile && (
            <div className="mt-5 p-4 border border-slate-200 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{displayName}</p>
                    <p className="text-xs text-slate-500">{displayRole}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Nav Links */}
          <div className="py-4 space-y-1.5">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`group w-full flex items-center justify-between text-left px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold shadow-xs'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-base sm:text-lg font-bold">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.index}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick CTA button */}
          <div className="pb-3">
            <button
              onClick={() => handleNavClick('jobs')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <span>Explore All 111+ Active Jobs</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>

          {/* Dedicated Country Sections in Mobile Drawer with Real-Time Search */}
          <div className="py-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-sans uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Browse by Location</span>
              </span>
              <button
                onClick={() => {
                  setSelectedCountryName('');
                  setMobileCountrySearch('');
                  setMobileMenuOpen(false);
                  onNavigate('jobs', { location: '' });
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset / All
              </button>
            </div>

            {/* Mobile Country Search Input */}
            <div className="relative mb-2.5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mobileCountrySearch}
                onChange={(e) => setMobileCountrySearch(e.target.value)}
                placeholder="Search hub (e.g. London, Tokyo, Singapore)..."
                className="w-full pl-8 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
              />
              {mobileCountrySearch && (
                <button
                  onClick={() => setMobileCountrySearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear country search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredMobileCountries.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400 col-span-full">
                  No matching countries or hubs found
                </div>
              ) : (
                filteredMobileCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setMobileCountrySearch('');
                      handleCountrySelect(country.name);
                    }}
                    className={`flex items-center justify-between p-2.5 bg-slate-50 border rounded-lg text-left transition-colors text-xs ${
                      selectedCountryName === country.name
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">{country.flag}</span>
                      <div className="min-w-0">
                        <p className="font-sans text-xs font-bold text-slate-900 truncate">
                          {country.name}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {country.cities.slice(0, 2).join(' · ')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-white text-slate-800 border border-slate-200 rounded shrink-0">
                      {country.mandatesCount}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Footer of Mobile Menu */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-sans">
            <span className="text-slate-500 font-medium">
              CareerSpring Global
            </span>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-slate-900 font-semibold">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 underline font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <span className="text-slate-400 font-medium">
                London · NY · SF · Global
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
