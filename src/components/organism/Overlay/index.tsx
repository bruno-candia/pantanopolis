import { ProgressBar } from '../../atomic/ProgressBar';
import { GameMenu } from '../../molecule/GameMenu';
import { Logo } from '../../molecule/Logo';
import { useOverlay } from './hook/useOverlay';
import './styles.css';

export function Overlay() {
  const {
    shown,
    hasLoaded,
    active,
    progress,
    handleStartGame,
    handleMusic,
    musicEnabled,
  } = useOverlay();

  return (
    shown && (
      <div className="overlay">
        <Logo />
        <div className="overlay-content">
          {!hasLoaded ? (
            <ProgressBar active={active} progress={progress} />
          ) : (
            <GameMenu
              onStartGame={handleStartGame}
              onMusic={handleMusic}
              musicEnabled={musicEnabled}
            />
          )}
        </div>
      </div>
    )
  );
}
