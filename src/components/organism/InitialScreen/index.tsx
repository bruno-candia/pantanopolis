import React from "react";
import { useProgress } from "@react-three/drei";
import { Board } from "../../molecule/Board";
import { ProgressBar } from "../../atomic/ProgressBar/indext";

type InitialScreenProps = {
  started: boolean;
  onStarted: () => void;
};

export const InitialScreen: React.FC<InitialScreenProps> = ({
  started,
  onStarted,
}) => {
  const { progress } = useProgress();

  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <Board progress={progress} onStarted={onStarted} />
      <ProgressBar progress={progress}/>
    </div>
  );
};
