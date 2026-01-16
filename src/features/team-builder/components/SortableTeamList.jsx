import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
} from "@dnd-kit/sortable";
import SortablePokemonCard from "@/features/team-builder/components/SortablePokemonCard";
import { useTeamStore } from "@/store/useTeamStore";


export default function SortableTeamList({ pokemon, onReorder }) {
    const removePokemon = useTeamStore((state) => state.removePokemonFromDraft);


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = pokemon.findIndex((p) => p.id === active.id);
    const newIndex = pokemon.findIndex((p) => p.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(pokemon, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pokemon.map((p) => p.id)}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {pokemon.map((poke) => (
            <SortablePokemonCard
              key={poke.id}
              pokemon={poke}
              onRemove={removePokemon}
            />
          ))}

          {[...Array(6 - pokemon.length)].map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-gray-800/50 border-2 border-dashed border-gray-700 
                      rounded-lg aspect-square flex items-center justify-center"
            >
              <span className="text-4xl text-gray-700">+</span>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
