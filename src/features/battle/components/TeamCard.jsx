import { MdCatchingPokemon, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function TeamCard({
  team,
  isSelected,
  onSelect,
  onDelete,
  onEdit,
  disabled,
}) {
  return (
    <div className="relative">
      <button
        onClick={() => onSelect(team.id)}
        disabled={disabled}
        className={`
        w-full p-4 rounded-lg border-2 transition-all duration-200
        ${
          isSelected
            ? "border-primary bg-primary/20 shadow-lg scale-105"
            : "border-gray-300 bg-white hover:border-primary hover:shadow-md"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      >
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <MdCatchingPokemon className="text-white text-xl" />
          </div>
        )}

        <h3 className="font-bold text-lg mb-3 text-gray-900">{team.name}</h3>

        <div className="flex gap-2 flex-wrap justify-center mb-2">
          {team.pokemons.map((pokemon, index) => (
            <img
              key={pokemon.id}
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-12 h-12 object-contain"
            />
          ))}
        </div>

        <p className="text-sm text-gray-600">{team.pokemons.length} Pokémon</p>
      </button>
      {!isSelected && !disabled && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(team.id);
            }}
            className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors"
            title="Edit team"
          >
            <MdEdit className="text-white text-sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors"
            title="Delete team"
          >
            <span className="text-white text-sm">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
