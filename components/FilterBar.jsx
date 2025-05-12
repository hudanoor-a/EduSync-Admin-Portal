import { useState, useEffect } from 'react';

export default function FilterBar({ 
  filters = [],
  activeFilters = {},
  onFilterChange,
  className = ''
}) {
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  // Initialize selected filters
  useEffect(() => {
    const initialFilters = {...activeFilters};
    filters.forEach(filter => {
      // Only set if not already in activeFilters
      if (!(filter.key in initialFilters)) {
        initialFilters[filter.key] = filter.defaultValue || '';
      }
    });
    setSelectedFilters(initialFilters);
  }, [filters, activeFilters]);

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterKey]: value
    };
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    const resetValues = {};
    filters.forEach(filter => {
      resetValues[filter.key] = filter.defaultValue || '';
    });
    setSelectedFilters(resetValues);
    if (onFilterChange) {
      onFilterChange(resetValues);
    }
  };

  // If no filters, don't render anything
  if (!filters.length) return null;

  return (
    <div className={`bg-white p-4 rounded-lg shadow mb-6 ${className}`}>
      <div className="flex flex-wrap items-center gap-4">
        {filters.map(filter => (
          <div key={filter.key} className="flex-grow sm:flex-grow-0">
            <label htmlFor={filter.key} className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            
            {filter.type === 'select' ? (
              <select
                id={filter.key}
                name={filter.key}
                value={selectedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">{filter.placeholder || 'All'}</option>
                {filter.options && filter.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : filter.type === 'date' ? (
              <input
                type="date"
                id={filter.key}
                name={filter.key}
                value={selectedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            ) : (
              <input
                type="text"
                id={filter.key}
                name={filter.key}
                placeholder={filter.placeholder}
                value={selectedFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            )}
          </div>
        ))}
        
        <div className="flex-grow sm:flex-grow-0 self-end">
          <button
            type="button"
            onClick={resetFilters}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}