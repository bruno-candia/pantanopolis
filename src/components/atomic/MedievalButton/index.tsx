import './styles.css';

type GemColor = 'blue' | 'red' | 'green' | 'beige';

interface MedievalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  gemColor?: GemColor;
}

export function MedievalButton({ 
  children, 
  gemColor = 'blue', 
  ...props 
}: MedievalButtonProps) {
  return (
    <button className="medieval-button" {...props}>
      <div className={`medieval-button-content gem-${gemColor}`}>
        {children}
      </div>
    </button>
  );
} 