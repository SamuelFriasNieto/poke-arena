import { useTeamStore } from "@/store/useTeamStore";
import { resolveBattle } from "@/lib/battleLogic";
import BattleDetails from "@features/battle/components/BattleDetails";
import TeamCard from "@/features/battle/components/TeamCard";
import { AppAlertDialog } from "@/components/AppAlertDialog";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCatchingPokemon } from "react-icons/md";
import { toast } from "react-toastify";

export default function Battle() {
  const savedTeams = useTeamStore((state) => state.savedTeams);
  const deleteTeam = useTeamStore((state) => state.deleteTeam);
  const loadTeamToDraft = useTeamStore((state) => state.loadTeamToDraft);
  const navigate = useNavigate();
  const [selectedTeamA, setSelectedTeamA] = useState(null);
  const [selectedTeamB, setSelectedTeamB] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteTeam = (team) => {
    deleteTeam(team);
    setTeamToDelete(null);
    setIsDialogOpen(false);
    toast.success("Team deleted successfully");
  };

  const handleEditTeam = (teamId) => {
    loadTeamToDraft(teamId);
    navigate("/team-builder");
    toast.info("Team loaded for editing");
  };

  const handleStartBattle = () => {
    if (!selectedTeamA || !selectedTeamB) {
      toast.error("Select two teams to battle");
      return;
    }

    if (selectedTeamA === selectedTeamB) {
      toast.error("You must select different teams");
      return;
    }

    const teamA = savedTeams.find((t) => t.id === selectedTeamA);
    const teamB = savedTeams.find((t) => t.id === selectedTeamB);

    try {
      const result = resolveBattle(teamA, teamB);
      setBattleResult(result);
    } catch (error) {
      toast.error("An error occurred while starting the battle");
      return;
    }
  };

  if (savedTeams.length === 0) {
    return (
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Battle Arena</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-lg text-yellow-800">
            You need to create and save at least two teams in the Team Builder
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Battle Arena</h1>

      {!battleResult && (
        <div>
          <div className="space-y-8 grid sm:grid-cols-1 lg:grid-cols-[1fr_0.3fr_1fr] gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Select Team A
              </h2>
              <div className="flex flex-col justify-center gap-4">
                {savedTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    isSelected={selectedTeamA === team.id}
                    onSelect={setSelectedTeamA}
                    disabled={selectedTeamB === team.id}
                    onEdit={() => handleEditTeam(team.id)}
                    onDelete={() => {
                      setTeamToDelete(team.id);
                      setIsDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-6 text-3xl font-bold text-gray-400">VS</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Select Team B
              </h2>
              <div className="flex flex-col justify-center gap-4">
                {savedTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    isSelected={selectedTeamB === team.id}
                    onSelect={setSelectedTeamB}
                    disabled={selectedTeamA === team.id}
                    onEdit={() => handleEditTeam(team.id)}
                    onDelete={() => {
                      setTeamToDelete(team.id);
                      setIsDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={handleStartBattle}
              disabled={!selectedTeamA || !selectedTeamB}
              className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 
              disabled:from-gray-400 disabled:to-gray-400 text-white font-bold flex items-center gap-2
              py-4 px-12 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-lg cursor-pointer"
            >
              <MdCatchingPokemon className="inline" size={25} /> Start Battle
            </button>
          </div>
        </div>
      )}

      <AppAlertDialog
        open={isDialogOpen}
        title={"Delete team?"}
        onOpenChange={setIsDialogOpen}
        onActionClick={() => handleDeleteTeam(teamToDelete)}
        isActionDestructive={true}
      />

      {battleResult && (
        <div>
          <button
            onClick={() => {
              setBattleResult(null);
              setSelectedTeamA(null);
              setSelectedTeamB(null);
            }}
            className=" px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
          >
            ← New Battle
          </button>

          <BattleDetails battleResult={battleResult} />
        </div>
      )}
    </div>
  );
}
