import axios from "axios";

export const pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPokemonList = async ({ limit = 20, offset = 0 } = {}) => {
  try {
    const response = await pokemonApi.get("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

export const fetchPokemonByType = async (type) => {
  try {
    const response = await pokemonApi.get(`/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon by type (${type}):`, error);
    throw error;
  }
};

export const fetchPokemonDetails = async (pokemonId) => {
  try {
    const response = await pokemonApi.get(`/pokemon/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon details (ID: ${pokemonId}):`, error);
    throw error;
  }
};

export const fetchMultiplePokemonDetails = async (pokemonIds) => {
  try {
    const promises = pokemonIds.map((id) => fetchPokemonDetails(id));
    return Promise.all(promises);
  } catch (error) {
    console.error("Error fetching multiple Pokémon details:", error);
    throw error;
  }
};
