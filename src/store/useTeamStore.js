import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_TEAM_SIZE = 6;

const transformPokemonForStorage = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  sprite: pokemon.sprites.other["official-artwork"].front_default,
  types: pokemon.types,
  stats: pokemon.stats,
});

const generateTeamId = () => `team_${Date.now()}`;

export const useTeamStore = create(
  persist(
    (set, get) => ({
      currentDraft: [],
      savedTeams: [],
      //------ ACCIONES DE GESTION DE BORRADOR -----

      addPokemonToDraft: (pokemon) => {
        const { currentDraft } = get();

        if (currentDraft.length >= MAX_TEAM_SIZE) {
          console.warn(
            `Cannot add pokemon: Team is full (max ${MAX_TEAM_SIZE})`
          );
          return false;
        }

        if (currentDraft.some((p) => p.id === pokemon.id)) {
          console.warn(
            `Cannot add pokemon: ${pokemon.name} is already in the team`
          );
          return false;
        }

        const pokemonForStorage = transformPokemonForStorage(pokemon);

        set((state) => ({
          currentDraft: [...state.currentDraft, pokemonForStorage],
        }));

        return true;
      },

      removePokemonFromDraft: (pokemonId) => {
        set((state) => ({
          currentDraft: state.currentDraft.filter((p) => p.id !== pokemonId),
        }));
      },

      reorderDraft: (newOrder) => {
        set({ currentDraft: newOrder });
      },

      discardDraft: () => {
        set({ currentDraft: [] });
      },

      //------ ACCIONES DE GESTION DE EQUIPOS-----

      saveTeam: (name) => {
        const { currentDraft, savedTeams } = get();

        if (currentDraft.length === 0) {
          console.warn("Cannot save team: Draft is empty");
          return null;
        }

        if (!name || name.trim().length === 0) {
          console.warn("Cannot save team: Name is required");
          return null;
        }

        const newTeam = {
          id: generateTeamId(),
          name: name.trim(),
          pokemons: [...currentDraft],
        };

        set({
          savedTeams: [...savedTeams, newTeam],
          currentDraft: [], 
        });

        return newTeam;
      },

      deleteTeam: (teamId) => {
        set((state) => ({
          savedTeams: state.savedTeams.filter((team) => team.id !== teamId),
        }));
      },

      loadTeamToDraft: (teamId) => {
        const { savedTeams } = get();
        const team = savedTeams.find((t) => t.id === teamId);

        if (team) {
          set({
            currentDraft: [...team.pokemons],
          });
        }
      },
    }),
    {
      name: "pokemon-team-storage",
    }
  )
);

export const selectIsDraftEmpty = (state) => state.currentDraft.length === 0;

export const selectSavedTeamsCount = (state) => state.savedTeams.length;

export const selectDraftPokemonIds = (state) => state.currentDraft.map((p) => p.id);

export const selectDraftSize = (state) => state.currentDraft.length;

export const selectIsDraftFull = (state) => state.currentDraft.length >= MAX_TEAM_SIZE;