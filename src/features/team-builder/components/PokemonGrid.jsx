import { useState, useMemo, useEffect, use } from "react";
import {
  usePokemonList,
  useMultiplePokemonDetails,
  usePokemonByType,
} from "../../../hooks/usePokemon";
import { useTeamStore, selectIsDraftFull } from '../../../store/useTeamStore';
import PokemonCard from "./PokemonCard";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

const ITEMS_PER_PAGE = 20;

export default function PokemonGrid({ searchTerm = "", selectedType = "" }) {
  //------ LOGICA DDE FILTRADO Y PAGINADO
  const [page, setPage] = useState(0);

  const addPokemon = useTeamStore((state) => state.addPokemonToDraft);
  const isDraftFull = useTeamStore(selectIsDraftFull);
  const currentDraft = useTeamStore((state) => state.currentDraft);
  
  const isPokemonInDraft = (pokemonId) => {
    return currentDraft.some((p) => p.id === pokemonId);
  };

  useEffect(() => {
    setPage(0);
  }, [searchTerm, selectedType]);

  const { data: allPokemonData, isLoading: loadingAll } = usePokemonList({
    limit: 10000,
    offset: 0,
    enabled: !selectedType,
  });

  const { data: typePokemonData, isLoading: loadingType } = usePokemonByType({
    selectedType,
  });

  const rawPokemonList = useMemo(() => {
    if (selectedType) {
      return typePokemonData?.pokemon?.map((p) => p.pokemon) || [];
    } else {
      return allPokemonData?.results || [];
    }
  }, [selectedType, typePokemonData, allPokemonData]);

  const filteredList = useMemo(() => {
    if (!searchTerm) return rawPokemonList;
    return rawPokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rawPokemonList, searchTerm]);

  const paginatedNames = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredList.slice(start, end).map((p) => p.name);
  }, [filteredList, page]);

  const { data: detailedPokemon = [], isLoading: loadingDetails } =
    useMultiplePokemonDetails(paginatedNames, {
      enabled: paginatedNames.length > 0,
    });

  //-- LOGICA DE UI

  const totalResults = filteredList.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const isLoading = loadingAll || loadingType || loadingDetails;


  if (isLoading && page === 0) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
    );
  } 

  if (totalResults === 0 && !isLoading) {
    return <div className="text-center py-12">No Pokemon found.</div>;
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-500">
        Found {totalResults} Pokemon
        {selectedType && (
          <span className="ml-1 text-primary">of type {selectedType}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {detailedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onAction={() => addPokemon(pokemon)}
            actionLabel={isPokemonInDraft(pokemon.id) ? "In Team ✓" : "Add"}
            disabled={isPokemonInDraft(pokemon.id) || isDraftFull}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-primary rounded disabled:opacity-50 text-white cursor-pointer hover:bg-primary/90"
          >
            Prev
          </button>
          <span className="py-2">
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-primary rounded disabled:opacity-50 text-white cursor-pointer hover:bg-primary/90"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
