import { OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";
import { TowerAndFloor } from "../../molecule/TowerAndFloor";
import { RoadIntersection } from "../../molecule/RoadIntersection";
import { PortalAndFloor } from "../../molecule/PortalAndFloor";
import { MountainTerrain } from "../../molecule/MountainTerrain";

export const Experience = () => {
  return (
    <>
     <OrbitControls 
        minPolarAngle={MathUtils.degToRad(20)} 
        maxPolarAngle={MathUtils.degToRad(180)}
        minDistance={1}  
        maxDistance={100}
        enablePan={true} // habilita arrastar (pan)
        panSpeed={1}    // velocidade do pan (pode ser ajustada)
        target={[0, 0, 0]} // define o ponto ao redor do qual a câmera orbita
      />

      <ambientLight intensity={1} />
      <directionalLight 
        position={[9, 5, 5]} 
        intensity={0.8} 
        castShadow 
        color={"#e8e8d9"}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      <TowerAndFloor position={[0, 0, 0]} />
      {/* <PortalAndFloor position={[-5,0,2]} rotation-y={Math.PI / 2} /> */}
    </>
  );
};