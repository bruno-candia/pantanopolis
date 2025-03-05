import React from 'react';
import { useProgress } from '@react-three/drei';
import loadingImage from '../../../assets/loading_map_ex.png';

type LoadingGameProps = {
  started: boolean;
  onStarted: () => void;
};

export const LoadingGame: React.FC<LoadingGameProps> = ({ started, onStarted }) => {
  const { progress } = useProgress();

  return (
    <div className={`loadingScreen ${started ? 'loadingScreen--started' : ''}`}>
      <div className="loadingScreen__board">
        <h1 className="loadingScreen__title">Tower Defense</h1>
        <img className="loadingScreen__image" src={loadingImage} alt="Loading" />
        <button 
          className="loadingScreen__button" 
          disabled={progress < 100}
          onClick={onStarted}
        >
          {progress === 100 ? 'Start' : 'Loading...'}
        </button>
      </div>
      <div className="loadingScreen__progress">
        <div 
          className="loadingScreen__progress__value" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
};