export const extractPokemonStats = (pokemon) => {
  const getStat = (statName) => 
    pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;
  
  return {
    hp: getStat('hp'),
    attack: getStat('attack'),
    defense: getStat('defense'),
    speed: getStat('speed'),
  };
};
