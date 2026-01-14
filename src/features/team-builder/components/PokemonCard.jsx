import { TYPE_COLORS } from '../../../config/pokemons.config';

const PokemonStats = [
  'HP',
  'ATK',
  'DEF',
  'SPD',
]

export default function PokemonCard({ pokemon, onAction, actionLabel, disabled = false, mode = 'search' }) {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
  
  const hp = pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  const attack = pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
  const defense = pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
  const speed = pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;

  return (
    <div className={`bg-card border rounded-lg p-4 transition-all hover:shadow-lg ${
      mode === 'draft' ? 'border-primary' : 'border-gray-700'
    }`}>
      <div className="relative aspect-square rounded-lg mb-3 overflow-hidden">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
        />
        
        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
      </div>

      <h3 className="text-lg font-bold capitalize mb-2">
        {pokemon.name}
      </h3>

      <div className="flex gap-2 mb-3">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`${TYPE_COLORS[typeInfo.type.name]} 
              text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        {PokemonStats.map((stat) => {
          return (<div key={stat} className="flex justify-between border border-primary px-2 py-1 rounded ">
            <span className="font-medium">{stat}:</span>
            <span>
              {stat === 'HP' && hp}
              {stat === 'ATK' && attack}
              {stat === 'DEF' && defense}
              {stat === 'SPD' && speed}
            </span>
          </div>)
        })}
      </div>

      <button
        onClick={onAction}
        disabled={disabled}
        className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
          disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : mode === 'draft'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-primary hover:bg-accent text-white'
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
