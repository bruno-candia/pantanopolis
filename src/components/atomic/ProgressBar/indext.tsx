interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="loadingScreen__progress">
      <div
        className="loadingScreen__progress__value"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
