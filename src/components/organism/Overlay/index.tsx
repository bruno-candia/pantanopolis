import { useProgress } from "@react-three/drei";
import { useUnit } from "effector-react";
import { useState, useEffect } from "react";
import {
  setGameStart,
  setMusicEnabled,
} from "../../../store/GameSetting/GameSettingEvent";
import { $gameSetting } from "../../../store/GameSetting/GameSettingStore";
import { ProgressBar } from "../../atomic/ProgressBar";
import { GameMenu } from "../../molecule/GameMenu";
import { Logo } from "../../molecule/Logo";
import "./styles.css";

export function Overlay() {
  const [shown, setShown] = useState(true);

  const [opaque, setOpaque] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { gameStarted, gameOver, musicEnabled } = useUnit($gameSetting);
  const { active, progress } = useProgress();

  useEffect(() => {
    if (gameStarted || gameOver) {
      setShown(false);
    } else if (!gameStarted) {
      setShown(true);
    }
  }, [gameStarted, gameOver, setShown]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (hasLoaded === opaque) t = setTimeout(() => setOpaque(!hasLoaded), 300);
    return () => clearTimeout(t);
  }, [hasLoaded, opaque]);

  useEffect(() => {
    if (progress >= 100) {
      setHasLoaded(true);
    }
  }, [progress]);

  function handleStartGame() {
    setGameStart();
  }

  const handleMusic = () => {
    setMusicEnabled();
  };

  return (
    shown && (
      <div className="overlay">
        <Logo />
        <div className="overlay__menu">
        {!hasLoaded ? (
          <ProgressBar active={active} progress={progress} />
        ) : (
          <>
            <GameMenu
              onStartGame={handleStartGame}
              onMusic={handleMusic}
              musicEnabled={musicEnabled}
            />
            {/* <div className="game-author-info">
                <Author />  
              </div>*/}
          </>
        )}
      </div>
      </div>
    )
  );
}
