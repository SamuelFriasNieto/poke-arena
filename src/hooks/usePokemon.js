import { useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchMultiplePokemonDetails,
  fetchPokemonByType,
} from "@/api/pokemonApi";

export const usePokemonList = ({
  limit = 20,
  offset = 0,
  enabled = true,
} = {}) => {
  return useQuery({
    queryKey: ["pokemon-list", { limit, offset }],
    queryFn: () => fetchPokemonList({ limit, offset }),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const usePokemonByType = ({ selectedType }) => {
  return useQuery({
    queryKey: ["pokemonByType", selectedType],
    queryFn: () => fetchPokemonByType(selectedType),
    enabled: !!selectedType, 
    staleTime: 1000 * 60 * 60, 
  });
};

export const usePokemonDetails = (pokemonId, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["pokemon-details", pokemonId],
    queryFn: () => fetchPokemonDetails(pokemonId),
    enabled: enabled && !!pokemonId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export const useMultiplePokemonDetails = (
  pokemonIds,
  { enabled = true } = {}
) => {
  return useQuery({
    queryKey: ["pokemon-multiple", pokemonIds],
    queryFn: () => fetchMultiplePokemonDetails(pokemonIds),
    enabled: enabled && pokemonIds && pokemonIds.length > 0,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export const usePokemonQueries = (pokemonIds) => {
  return useQueries({
    queries: pokemonIds.map((id) => ({
      queryKey: ["pokemon-details", id],
      queryFn: () => fetchPokemonDetails(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
    })),
  });
};
