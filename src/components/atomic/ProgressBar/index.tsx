import "./styles.css";
import * as React from 'react';

const defaultDataInterpolation = (p: number) => `Loading: ${p.toFixed(0)}%`;

interface ProgressBarProps {
  progress: number;
  active: boolean;
  dataInterpolation?: (progress: number) => string;
}

export function ProgressBar({ 
  active, 
  progress, 
  dataInterpolation = defaultDataInterpolation 
}: ProgressBarProps) {
  const progressRef = React.useRef(0);
  const rafRef = React.useRef(0);
  const progressSpanRef = React.useRef<HTMLSpanElement>(null);

  const updateProgress = React.useCallback(() => {
    if (!progressSpanRef.current) return;
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100) progressRef.current = progress;
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current);
    if (progressRef.current < progress) rafRef.current = requestAnimationFrame(updateProgress);
  }, [dataInterpolation, progress]);

  React.useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  return (
    <div className={`loadingScreen__progress ${active ? 'active' : ''}`}>
      <div className="loadingScreen__inner">
        <div 
          className="loadingScreen-bar"
          style={{ transform: `scaleX(${progress / 100})` }}
        ></div>
      </div>
      <div className="loadingScreen__text">
        <span ref={progressSpanRef} className="loadingScreen__data" />
      </div>
    </div>
  );
}
