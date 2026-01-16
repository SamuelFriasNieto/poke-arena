import React from "react";
import { FaTrophy } from "react-icons/fa";
import { FaSkull } from "react-icons/fa";

const BattleResultTeamCard = ({ team }) => {
  const isWinner = team.isWinner;
  return (
    <div
      className={`border ${
        isWinner
          ? "border-primary outline-3 outline-primary"
          : "border-gray-800"
      } rounded-lg px-5 py-4`}
    >
      <div className="flex justify-between mb-6">
        <div className="flex gap-3 items-center">
          {isWinner && <FaTrophy className="text-yellow-500 text-3xl" />}
          <h3 className="text-xl">{team.name}</h3>
        </div>
        <span
          className={`px-2 py-1 ${
            isWinner ? "bg-primary" : "bg-gray-500"
          } rounded-lg text-white`}
        >
          {isWinner ? "Winner" : "Loser"}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        {team.pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className={`${
              pokemon.fainted ? "bg-primary/20" : "bg-gray-300"
            } rounded-full p-2 relative`}
          >
            {pokemon.fainted && (
              <FaSkull className="absolute -bottom-1 right-1 text-primary" />
            )}
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className={`w-10 ${pokemon.fainted ? "opacity-50" : ""}`}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <div className="bg-green-600 w-2 h-2 rounded-full"></div>
          <p>
            Alive: {team.pokemons.filter((pokemon) => !pokemon.fainted).length}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-primary w-2 h-2 rounded-full"></div>
          <p>
            death: {team.pokemons.filter((pokemon) => pokemon.fainted).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BattleResultTeamCard;
