import { useProgress } from '@react-three/drei';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { setGameStart } from '../../../../store/GameSetting/GameSettingEvent';

import { setMusicEnabled } from '../../../../store/GameSetting/GameSettingEvent';
import { $gameSetting } from '../../../../store/GameSetting/GameSettingStore';

interface UseOverlayReturn {
  shown: boolean;
  opaque: boolean;
  hasLoaded: boolean;
  handleStartGame: () => void;
  handleMusic: () => void;
  musicEnabled: boolean;
  active: boolean;
  progress: number;
}

export function useOverlay(): UseOverlayReturn {
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

  return {
    shown,
    opaque,
    hasLoaded,
    handleStartGame,
    handleMusic,
    musicEnabled,
    active,
    progress,
  };
}
