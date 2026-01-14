import { useState } from 'react';
import FilterBar from './components/FilterBar';
import DraftPreview from './components/DraftPreview';
import PokemonGrid from './components/PokemonGrid';

export default function TeamBuilder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Team Builder
        </h1>
        <p className="text-gray-400">
          Search and select up to 6 Pokemon to build your dream team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <DraftPreview />
          </div>
        </div>

        <div className="lg:col-span-2">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          <PokemonGrid
            searchTerm={searchTerm}
            selectedType={selectedType}
          />
        </div>
      </div>
    </div>
  );
}
