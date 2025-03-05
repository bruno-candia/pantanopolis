import loadingImage from '../../../assets/loading_map_ex.png';

interface BoardProps {
  progress: number;
  onStarted: () => void;
}

export function Board({
  progress,
  onStarted,
}: BoardProps){
  return (
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
  )
}