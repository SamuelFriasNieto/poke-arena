import { describe, it, expect } from "@jest/globals";
import {
  resolveBattle,
} from "@/lib/battleLogic";

const createMockPokemon = (name, { hp, attack, defense, speed }) => ({
  id: Math.random(),
  name,
  stats: [
    { stat: { name: "hp" }, base_stat: hp },
    { stat: { name: "attack" }, base_stat: attack },
    { stat: { name: "defense" }, base_stat: defense },
    { stat: { name: "speed" }, base_stat: speed },
  ],
});

describe("Battle Logic", () => {
  it("should resolve a full battle", () => {
    const teamA = {
      name: "Team A",
      pokemons: [
        createMockPokemon("Pikachu", {
          hp: 35,
          attack: 100,
          defense: 40,
          speed: 90,
        }),
        createMockPokemon("Charizard", {
          hp: 78,
          attack: 110,
          defense: 78,
          speed: 100,
        }),
      ]
    };

    const teamB = {
      name: "Team B",
      pokemons: [
        createMockPokemon("Squirtle", {
          hp: 44,
          attack: 48,
          defense: 65,
          speed: 43,
        }),
      ]
    };

    const result = resolveBattle(teamA, teamB);

    expect(result.winner).toBe("Team A");
    expect(result.finalState.teamBRemaining).toBe(0);
    expect(result.finalState.teamARemaining).toBeGreaterThan(0);
    expect(result.rounds).toBeDefined();
    expect(result.rounds.length).toBeGreaterThan(0);
  });
});
