import { MdCatchingPokemon } from "react-icons/md";
import { FaTrashAlt, FaSave, FaRandom } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { useTeamStore, selectIsDraftEmpty } from '@/store/useTeamStore';
import { AppAlertDialog } from "@/components/AppAlertDialog";
import SortableTeamList from "@/features/team-builder/components/SortableTeamList";

export default function DraftPreview() {
  const currentDraft = useTeamStore((state) => state.currentDraft);
  const isDraftEmpty = useTeamStore(selectIsDraftEmpty);
  const saveTeam = useTeamStore((state) => state.saveTeam);
  const discardDraft = useTeamStore((state) => state.discardDraft);
  const reorderDraft = useTeamStore((state) => state.reorderDraft);
  const editingTeamId = useTeamStore((state) => state.editingTeamId);
  const savedTeams = useTeamStore((state) => state.savedTeams);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    if (editingTeamId) {
      const editingTeam = savedTeams.find(t => t.id === editingTeamId);
      if (editingTeam) {
        setTeamName(editingTeam.name);
      }
    } else {
      setTeamName('');
    }
  }, [editingTeamId, savedTeams]);

  const handleSaveTeam = () => {
    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }
    const savedTeam = saveTeam(teamName);
    if (savedTeam) {
      const action = editingTeamId ? 'updated' : 'saved';
      toast.success(`Team "${teamName}" ${action} successfully!`);
      setTeamName('');
    }
  };

  const handleDiscardDraft = () => {
    discardDraft();
  };

  const handleRandomSort = () => {
    const shuffled = [...currentDraft].sort(() => Math.random() - 0.5);
    reorderDraft(shuffled);
  };

  const handleSortByStat = (statName) => {
    const sorted = [...currentDraft].sort((a, b) => {
      const statA = a.stats.find(s => s.stat.name === statName)?.base_stat || 0;
      const statB = b.stats.find(s => s.stat.name === statName)?.base_stat || 0;
      return statB - statA; 
    });
    reorderDraft(sorted);
  };

  return (
    <div className="bg-card border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">
            {editingTeamId ? 'Edit Team' : 'Your Team'}
          </h2>
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
            >
              {index < currentDraft.length && <MdCatchingPokemon className="w-full text-primary"/>}
            </div>
          ))}
        </div>
      </div>

      {isDraftEmpty ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2">No Pokemon in your team yet</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex gap-2">
            <button
              onClick={handleRandomSort}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 
                text-white text-sm rounded-lg transition-colors"
            >
              <FaRandom className="text-xs" />
              Shuffle
            </button>
            
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => handleSortByStat(e.target.value)}
                defaultValue=""
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm 
                  rounded-lg transition-colors border-none cursor-pointer"
              >
                <option className="text-accent" value="" disabled>Sort by stat</option>
                <option value="hp">HP</option>
                <option value="attack">Attack</option>
                <option value="defense">Defense</option>
                <option value="speed">Speed</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <SortableTeamList
              pokemon={currentDraft}
              onReorder={reorderDraft}
            />
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
              className="w-full px-4 py-2 border border-gray-700 rounded-lg 
                placeholder-gray-500"
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
              <FaSave className="inline mr-2" /> {editingTeamId ? 'Update Team' : 'Save Team'}
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold 
                py-3 px-4 rounded-lg transition-colors flex items-center"
            >
              <FaTrashAlt className="inline mr-2" /> {editingTeamId ? 'Cancel' : 'Discard'}
            </button>
          </div>

          <AppAlertDialog
            open={isDialogOpen}
            title={editingTeamId ? "Cancel editing?" : "Delete draft?"} 
            onOpenChange={setIsDialogOpen}
            onActionClick={handleDiscardDraft}
            isActionDestructive={true}
          />
        </>
      )}
    </div>
  );
}
