import { useState, useEffect, useMemo } from "react";
import {
  usePokemonList,
  useMultiplePokemonDetails,
  usePokemonByType,
} from "@/hooks/usePokemon";
import { useTeamStore, selectIsDraftFull } from "@/store/useTeamStore";
import { ITEMS_PER_PAGE } from "@/config/pokemons.config";

export const usePokemonGrid = ({ searchTerm, selectedType, onAddPokemon, isDraftFull, currentDraft }) => {
  const [page, setPage] = useState(0);

  const isPokemonInDraft = (pokemonId) => {
    return currentDraft.some((p) => p.id === pokemonId);
  };

  useEffect(() => {
    setPage(0);
  }, [searchTerm, selectedType]);

  const { data: allPokemonData, isLoading: loadingAll, error: errorAll } = usePokemonList({
    limit: 10000,
    offset: 0,
    enabled: !selectedType,
  });

  const { data: typePokemonData, isLoading: loadingType, error: errorType } = usePokemonByType({
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

  const { data: detailedPokemon = [], isLoading: loadingDetails, error: errorDetails } =
    useMultiplePokemonDetails(paginatedNames, {
      enabled: paginatedNames.length > 0,
    });

  return {
    detailedPokemon,
    isDraftFull,
    onAddPokemon,
    isPokemonInDraft,
    page,
    setPage,
    totalResults: filteredList.length,
    isLoading: loadingAll || loadingType || loadingDetails,
    isError: errorAll || errorType || errorDetails,
  };
};
