import { useState } from 'react';
import { POKEMON_TYPES } from '../../../config/pokemons.config';

export default function FilterBar({ searchTerm, onSearchChange, selectedType, onTypeChange }) {
  return (
    <div className="bg-card border border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search Pokemon
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 
              focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="sm:w-48">
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
              text-white capitalize focus:outline-none focus:ring-2 focus:ring-primary 
              focus:border-transparent cursor-pointer"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(searchTerm || selectedType) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 bg-primary/20 text-primary 
              px-3 py-1 rounded-full text-sm">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-white"
                aria-label="Clear search"
              >
                ✕
              </button>
            </span>
          )}
          
          {selectedType && (
            <span className="inline-flex items-center gap-1 bg-primary/20 text-primary 
              px-3 py-1 rounded-full text-sm capitalize">
              Type: {selectedType}
              <button
                onClick={() => onTypeChange('')}
                className="hover:text-white"
                aria-label="Clear type filter"
              >
                ✕
              </button>
            </span>
          )}

          <button
            onClick={() => {
              onSearchChange('');
              onTypeChange('');
            }}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
