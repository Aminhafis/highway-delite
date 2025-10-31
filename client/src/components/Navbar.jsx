import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef } from 'react';
import { getExperiences } from '../api/bookItApi';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allExperiences, setAllExperiences] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Fetch all experiences on mount
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        setAllExperiences(data);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      }
    };
    fetchExperiences();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input change and filter suggestions
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const query = value.toLowerCase().trim();
      const filtered = allExperiences.filter((exp) =>
        exp.name.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [allExperiences]);

  // Handle search submission
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
      setShowSuggestions(false);
    } else {
      navigate('/');
    }
  }, [searchQuery, navigate]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((experienceId) => {
    navigate(`/details/${experienceId}`);
    setSearchQuery('');
    setShowSuggestions(false);
  }, [navigate]);

  // Handle Enter key
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }, [handleSearch]);

  // Clear search on logo click
  const handleLogoClick = useCallback(() => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Highway Delite Home"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">HD</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900 tracking-tight">highway</span>
              <span className="text-sm text-gray-600 -mt-1">delite</span>
            </div>
          </Link>

          {/* Search Bar with Suggestions */}
          <div className="flex items-center flex-1 justify-end" ref={searchRef}>
            <form 
              onSubmit={handleSearch}
              className="w-full max-w-md relative"
              role="search"
              aria-label="Search experiences form"
            >
              <div className="relative flex items-stretch">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  placeholder="Search experiences"
                  className="flex-1 px-4 py-2.5 pr-2 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm placeholder:text-gray-400"
                  aria-label="Search experiences"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-r-lg transition-colors font-semibold text-sm border border-yellow-400 hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {suggestions.map((exp) => (
                    <button
                      key={exp._id}
                      onClick={() => handleSuggestionClick(exp._id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                    >
                      {/* Thumbnail */}
                      <img 
                        src={exp.imageUrl} 
                        alt={exp.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {exp.name}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {exp.location}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{exp.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {showSuggestions && searchQuery.trim() && suggestions.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                  <p className="text-sm text-gray-600 text-center">
                    No experiences found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
