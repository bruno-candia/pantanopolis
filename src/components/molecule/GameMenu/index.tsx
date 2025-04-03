import { MedievalButton } from '../../atomic/MedievalButton';
import './styles.css';

interface GameMenuProps {
  onStartGame: () => void;
  onMusic: () => void;
  musicEnabled: boolean;
}

export function GameMenu({
  onStartGame,
  onMusic,
  musicEnabled,
}: GameMenuProps) {
  return (
    <div className="game-menu">
      <MedievalButton onClick={onStartGame}>Start</MedievalButton>
      <MedievalButton gemColor="beige">Upgrade</MedievalButton>
      <MedievalButton
        gemColor="beige"
        onClick={onMusic}
      >{`MUSIC ${musicEnabled ? 'ON' : 'OFF'}`}</MedievalButton>
      <MedievalButton gemColor="green">Donate</MedievalButton>
    </div>
  );
}
