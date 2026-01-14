import axios from 'axios';

export const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPokemonList = async ({ limit = 20, offset = 0 } = {}) => {
  const response = await pokemonApi.get('/pokemon', {
    params: { limit, offset },
  });
  return response.data;
};

export const fetchPokemonByType = async (type) => {
  const response = await pokemonApi.get(`/type/${type}`);
  return response.data;
};

export const fetchPokemonDetails = async (pokemonId) => {
  const response = await pokemonApi.get(`/pokemon/${pokemonId}`);
  return response.data;
};

export const fetchMultiplePokemonDetails = async (pokemonIds) => {
  const promises = pokemonIds.map((id) => fetchPokemonDetails(id));
  return Promise.all(promises);
};
