export const getStat = (stats, statName) => {
  return stats.find((s) => s.stat.name === statName)?.base_stat || 0;
};

export const cloneTeam = (team) => {
  return team.map((pokemon) => ({ ...pokemon, fainted: false }));
};

export const simulateRound = (pokemon1, pokemon2) => {
  const speed1 = getStat(pokemon1.stats, "speed");
  const speed2 = getStat(pokemon2.stats, "speed");
  const attack1 = getStat(pokemon1.stats, "attack");
  const attack2 = getStat(pokemon2.stats, "attack");
  const defense1 = getStat(pokemon1.stats, "defense");
  const defense2 = getStat(pokemon2.stats, "defense");

  const faster = speed1 >= speed2 ? pokemon1 : pokemon2;
  const slower = speed1 >= speed2 ? pokemon2 : pokemon1;
  const fasterAttack = speed1 >= speed2 ? attack1 : attack2;
  const slowerAttack = speed1 >= speed2 ? attack2 : attack1;
  const fasterDefense = speed1 >= speed2 ? defense1 : defense2;
  const slowerDefense = speed1 >= speed2 ? defense2 : defense1;

  let winner, loser;

  if (fasterAttack > slowerDefense) {
    winner = faster;
    loser = slower;
  } else if (slowerAttack > fasterDefense) {
    winner = slower;
    loser = faster;
  } else {
    winner = faster;
    loser = slower;
  }

  return {
    winner,
    loser,
    pokemon1Data: {
      pokemon: pokemon1,
      stats: {
        attack: attack1,
        defense: defense1,
        speed: speed1,
      },
      isWinner: winner === pokemon1,
    },
    pokemon2Data: {
      pokemon: pokemon2,
      stats: {
        attack: attack2,
        defense: defense2,
        speed: speed2,
      },
      isWinner: winner === pokemon2,
    },
  };
};

export const resolveBattle = (teamA, teamB) => {
  const clonedTeamA = cloneTeam(teamA.pokemons);
  const clonedTeamB = cloneTeam(teamB.pokemons);

  const rounds = [];
  let indexA = 0;
  let indexB = 0;
  let roundNumber = 1;

  while (indexA < clonedTeamA.length && indexB < clonedTeamB.length) {
    const pokemonA = clonedTeamA[indexA];
    const pokemonB = clonedTeamB[indexB];

    const roundResult = simulateRound(pokemonA, pokemonB);

    rounds.push({
      roundNumber,
      pokemonA: {
        ...pokemonA,
        stats: {
          attack: roundResult.pokemon1Data.stats.attack,
          defense: roundResult.pokemon1Data.stats.defense,
          speed: roundResult.pokemon1Data.stats.speed,
        },
        isWinner: roundResult.pokemon1Data.isWinner,
      },
      pokemonB: {
        ...pokemonB,
        stats: {
          attack: roundResult.pokemon2Data.stats.attack,
          defense: roundResult.pokemon2Data.stats.defense,
          speed: roundResult.pokemon2Data.stats.speed,
        },
        isWinner: roundResult.pokemon2Data.isWinner,
      },
    });

    if (roundResult.loser === pokemonA) {
      clonedTeamA[indexA].fainted = true;
      indexA++;
    } else {
      clonedTeamB[indexB].fainted = true;
      indexB++;
    }

    roundNumber++;
  }

  const teamAWins = indexB >= clonedTeamB.length;

  return {
    winner: teamAWins ? teamA.name : teamB.name,
    rounds,
    finalState: {
      teamA: {
        isWinner: teamAWins,
        name: teamA.name,
        pokemons: clonedTeamA,
      },
      teamB: {
        isWinner: !teamAWins,
        name: teamB.name,
        pokemons: clonedTeamB,
      },
      teamARemaining: clonedTeamA.length - indexA,
      teamBRemaining: clonedTeamB.length - indexB,
    },
    totalRounds: roundNumber - 1,
  };
};
