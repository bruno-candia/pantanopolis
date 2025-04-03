import castle from '../../../assets/castle.png';
import './styles.css';

export function Logo() {
  return (
    <div className="logo">
      <h1 className="left-title">Tower</h1>
      <img src={castle} alt="Castle Image" />
      <h1 className="right-title">Defense</h1>
    </div>
  );
}
