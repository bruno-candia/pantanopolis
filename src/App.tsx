import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { LoadingGame } from "./components/molecule/LoadingGame";
import { Experience } from "./pages/Experience";

const audio = new Audio("./audio/Song Of Unity.mp3");

export function App() {
  const [start, setStart] = useState(false);
  const volume = 0.01;

  useEffect(() => {
    if (start) {
      audio.volume = volume;
      audio.loop = true;
      audio.play().catch(err => {
        console.warn("Audio playback failed:", err);
      });
    }
  }, [start, volume]);

  return (
    <>
      <Canvas shadows camera={{ position: [-10, 15, 10], fov: 35 }}>
        <Suspense fallback={null}>
          {start && <Experience />}
        </Suspense>
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.42}
            radius={0.72}
          />
        </EffectComposer>
      </Canvas>
      <LoadingGame started={start} onStarted={() => setStart(true)} />
    </>
  );
}