import PokemonCard from "@/features/team-builder/components/PokemonCard";
import PokemonCardSkeleton from "@/features/team-builder/components/PokemonCardSkeleton";
import { ITEMS_PER_PAGE } from "@/config/pokemons.config";
import { usePokemonGrid } from "@/features/team-builder/hooks/usePokemonGrid";
import { useTeamStore, selectIsDraftFull } from "@/store/useTeamStore";

export default function PokemonGrid({ searchTerm = "", selectedType = "" }) {

  const addPokemon = useTeamStore((state) => state.addPokemonToDraft);
  const isDraftFull = useTeamStore(selectIsDraftFull);
  const currentDraft = useTeamStore((state) => state.currentDraft);

  const {
    detailedPokemon,
    isPokemonInDraft,
    page,
    setPage,
    isLoading,
    totalResults,
  } = usePokemonGrid({ searchTerm, selectedType, addPokemon, isDraftFull, currentDraft });

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  if (isLoading) {
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
