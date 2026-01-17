import BattleTurns from "@features/battle/components/BattleTurns";
import BattleResultTeamCard from "@features/battle/components/BattleResultTeamCard";
import { MdCatchingPokemon } from "react-icons/md";
import { useEffect, useRef } from "react";
import victoryMusic from "@/assets/PokemonVictoryMusic.mp3";

export default function BattleDetails({ battleResult }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(victoryMusic);
    audioRef.current.volume = 0.2; 
    audioRef.current.play().catch(error => {
      console.log("El audio ha fallado", error);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  if (!battleResult?.rounds) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative p-4 mb-15  text-center">
        <MdCatchingPokemon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20"
          size={150}
        />
        <h3 className="text-2xl font-bold  flex items-center justify-center gap-2 text">
          {battleResult.winner} WINS
        </h3>
        <p className=" mt-2">
          Total rounds: {battleResult.totalRounds}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BattleResultTeamCard team={battleResult.finalState.teamA} />
        <BattleResultTeamCard team={battleResult.finalState.teamB} />
      </div>

      <h2 className="text-2xl font-bold mb-6">Combat Details</h2>

      <BattleTurns battleResult={battleResult} />
    </div>
  );
}
