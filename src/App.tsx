import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/organism/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

function App() {
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense>
        <Physics debug>
          <Experience />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

export default App;