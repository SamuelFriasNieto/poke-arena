import { usePokemonList, usePokemonDetails, useMultiplePokemonDetails, usePokemonQueries } from "../../hooks/usePokemon";

export default function TeamBuilder() {
  const { data: pokemonList, isLoading: listLoading } = usePokemonList({
    limit: 10,
    offset: 0,
  });
  console.log("LISTA POKEMON", pokemonList);

  const { data: pikachu, isLoading: pikachuLoading } = usePokemonDetails("pikachu");
  console.log("DETALLES PIKACHU", pikachu);

  const {data: pokemonsDetails, isLoading: pokemonsLoading} = useMultiplePokemonDetails(["bulbasaur", "charmander", "squirtle"]);
  console.log("VARIOS POKEMON:", pokemonsDetails);

  const { data: pokemonQueriesData, isLoading: pokemonQueriesLoading } = usePokemonQueries(["eevee", "jigglypuff", "meowth"]);
  console.log("QUERIES POKEMON:", pokemonQueriesData);
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Builder</h1>
    </div>
  );
}
