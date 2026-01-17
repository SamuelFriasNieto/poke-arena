import React from "react";
import { FaTrophy } from "react-icons/fa";


const BattleTurns = ({ battleResult }) => {
  return (
    <div className="space-y-4">
      {battleResult.rounds.map((round) => (
        <div
          key={round.roundNumber}
          className="bg-gray-100 rounded-lg p-4 shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 ">
              <div className="bg-white text-center px-3 py-1 rounded-md font-semibold">
                Round {round.roundNumber}
              </div>

              <img
                src={round.pokemonA.sprite}
                alt={round.pokemonA.name}
                className={`w-16 h-16 object-contain ${
                  round.pokemonA.isWinner ? "" : "opacity-40"
                }`}
              />

              <div className="flex-1">
                <div className="flex gap-2">
                  {round.pokemonA.isWinner && (
                    <FaTrophy className="text-yellow-500 text-2xl" />
                  )}
                  <h3 className="font-bold text-lg capitalize mb-1">
                    {round.pokemonA.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  ATK: {round.pokemonA.stats.attack} | DEF:{" "}
                  {round.pokemonA.stats.defense} | SPD:{" "}
                  {round.pokemonA.stats.speed}
                </p>
              </div>
            </div>

            <div>
              <span className="text-gray-500">vs</span>
            </div>

            <div className="flex flex-col sm:flex-row text-right gap-4 items-center ">
              <img
                src={round.pokemonB.sprite}
                alt={round.pokemonB.name}
                className={`w-16 h-16 object-contain ${
                  round.pokemonB.isWinner ? "" : "opacity-40"
                }`}
              />
              <div>
                <div className="flex gap-2 justify-center sm:justify-end">
                  {round.pokemonB.isWinner && (
                    <FaTrophy className="text-yellow-500 text-2xl" />
                  )}

                  <h3 className="font-bold text-lg capitalize mb-1">
                    {round.pokemonB.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600">
                  ATK: {round.pokemonB.stats.attack} | DEF:{" "}
                  {round.pokemonB.stats.defense} | SPD:{" "}
                  {round.pokemonB.stats.speed}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BattleTurns;
