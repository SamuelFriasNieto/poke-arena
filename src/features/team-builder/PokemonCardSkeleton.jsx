
export default function PokemonCardSkeleton() {
  return (
    <div className="bg-card border border-gray-700 rounded-lg p-4 animate-pulse">
      <div className="aspect-square bg-gray-800 rounded-lg mb-3"></div>

      <div className="h-5 bg-gray-800 rounded w-3/4 mx-auto mb-2"></div>

      <div className="flex gap-2 mb-3 justify-center">
        <div className="h-5 w-16 bg-gray-800 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-800 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-8 bg-gray-800 rounded"></div>
        <div className="h-8 bg-gray-800 rounded"></div>
        <div className="h-8 bg-gray-800 rounded"></div>
        <div className="h-8 bg-gray-800 rounded"></div>
      </div>

      <div className="h-10 bg-gray-800 rounded"></div>
    </div>
  );
}
