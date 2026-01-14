import { MdCatchingPokemon } from "react-icons/md";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

import { useTeamStore, selectIsDraftEmpty } from '../../store/useTeamStore';
import { AppAlertDialog } from "@/components/AppAlertDialog";
import PokemonCardDraft from "./components/PokemonCardDraft";

export default function DraftPreview() {
  const currentDraft = useTeamStore((state) => state.currentDraft);
  const isDraftEmpty = useTeamStore(selectIsDraftEmpty);
  const removePokemon = useTeamStore((state) => state.removePokemonFromDraft);
  const saveTeam = useTeamStore((state) => state.saveTeam);
  const discardDraft = useTeamStore((state) => state.discardDraft);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  const savedTeams = useTeamStore((state) => state.savedTeams);
  console.log(savedTeams);

  const handleSaveTeam = () => {
    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }
    const savedTeam = saveTeam(teamName);
    if (savedTeam) {
      toast.success(`Team "${teamName}" saved successfully!`);
      setTeamName('');
    }
  };

  const handleDiscardDraft = () => {
    discardDraft();
  };

  return (
    <div className="bg-card border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Your Team</h2>
          <p className="text-gray-400 text-sm mt-1">
            {currentDraft.length}/6 Pokemon selected
          </p>
        </div>
        
        <div className="flex gap-1">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full flex items-center ${
                index < currentDraft.length ? '' : 'bg-gray-700'
              }`}
            >{index < currentDraft.length && <MdCatchingPokemon className="w-full text-primary"/>}</div>
          ))}
        </div>
      </div>

      {isDraftEmpty ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2">No Pokemon in your team yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {currentDraft.map((pokemon) => (
              <PokemonCardDraft key={pokemon.id} pokemon={pokemon} removePokemon={removePokemon} />
            ))}

            {[...Array(6 - currentDraft.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gray-800/50 border-2 border-dashed border-gray-700 
                  rounded-lg aspect-square flex items-center justify-center"
              >
                <span className="text-4xl text-gray-700">+</span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="team-name" className="block text-sm font-medium mb-2">
              Team Name
            </label>
            <input
              id="team-name"
              type="text"
              placeholder="Enter your team name..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2  border border-gray-700 rounded-lg 
                placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveTeam}
              disabled={!teamName.trim()}
              className="flex-1 bg-primary hover:bg-blue-600 text-white font-semibold 
                py-3 px-4 rounded-lg transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center justify-center"
            >
              <FaSave className="inline mr-2" /> Save Team
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold 
                py-3 px-4 rounded-lg transition-colors flex items-center"
            >
              <FaTrashAlt className="inline mr-2" /> Discard
            </button>
          </div>

          <p className="text-gray-500 text-xs text-center mt-4">
            Your draft is automatically saved in your browser
          </p>

          <AppAlertDialog
            open={isDialogOpen}
            title={"¿Delete draft?"} 
            onOpenChange={setIsDialogOpen}
            onActionClick={handleDiscardDraft}
            isActionDestructive={true}
            />
        </>
      )}
    </div>
  );
}
