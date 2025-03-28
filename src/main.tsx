import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { GameWorld } from './components/pages/GameWorld';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<GameWorld />);