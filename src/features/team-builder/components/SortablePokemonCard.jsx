import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TYPE_COLORS } from '../../../config/pokemons.config';

export default function SortablePokemonCard({ pokemon, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative border border-gray-800 rounded-lg p-3 group hover:bg-gray-750 transition-colors ${
        isDragging ? 'z-50 cursor-grabbing' : 'cursor-grab'
      }`}
      {...attributes}
      {...listeners}
    >
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-full aspect-square object-contain mb-2"
      />

      <p className="capitalize text-center font-semibold text-sm mb-1">
        {pokemon.name}
      </p>

      <div className="flex gap-1 justify-center">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`text-[10px] bg-gray-700 text-white px-2 py-0.5 
                        rounded-full capitalize ${
                          TYPE_COLORS[typeInfo.type.name]
                        }`}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>

      <button
        onClick={() => onRemove(pokemon.id)}
        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 
                    text-white rounded-full w-6 h-6 flex items-center justify-center 
                    opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${pokemon.name}`}
      >
        ✕
      </button>
    </div>
  );
}
