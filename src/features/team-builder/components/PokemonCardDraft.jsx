import React from "react";
import { TYPE_COLORS } from "@/config/pokemons.config";

const PokemonCardDraft = ({ pokemon, removePokemon }) => {
  return (
    <div
      key={pokemon.id}
      className="relative border border-gray-800 rounded-lg p-3 group hover:bg-gray-750 transition-colors"
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
        onClick={() => removePokemon(pokemon.id)}
        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 
                    text-white rounded-full w-6 h-6 flex items-center justify-center 
                    opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${pokemon.name}`}
      >
        ✕
      </button>
    </div>
  );
};

export default PokemonCardDraft;
