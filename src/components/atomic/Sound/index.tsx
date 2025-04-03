import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useUnit } from 'effector-react';
import { $gameSetting } from '../../../store/GameSetting/GameSettingStore';

import speedUp from '../../../assets/audio/Song Of Unity.mp3';

function Sound() {
  const { camera, musicEnabled } = useUnit($gameSetting);

  const soundOrigin = useRef<THREE.Group>(null);
  const [listener] = useState(() => new THREE.AudioListener());
  const [audioObj] = useState(() => new THREE.Audio(listener));
  const sound = useRef(audioObj);

  const speedUpSound = useLoader(THREE.AudioLoader, speedUp);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [bufferLoaded, setBufferLoaded] = useState(false);

  // Inicializa o contexto de áudio após interação do usuário
  useEffect(() => {
    if (!audioInitialized && listener.context.state === 'suspended') {
      const resumeAudioContext = () => {
        listener.context.resume().then(() => {
          console.log('AudioContext resumed successfully');
          setAudioInitialized(true);
          document.removeEventListener('click', resumeAudioContext);
        });
      };

      document.addEventListener('click', resumeAudioContext);
      return () => {
        document.removeEventListener('click', resumeAudioContext);
      };
    } else {
      setAudioInitialized(true);
    }
  }, [listener, audioInitialized]);

  useEffect(() => {
    if (audioInitialized && !bufferLoaded && sound.current) {
      sound.current.setBuffer(speedUpSound);
      sound.current.setLoop(true);
      setBufferLoaded(true);
      console.log('Buffer loaded');
    }
  }, [speedUpSound, audioInitialized, bufferLoaded]);

  useEffect(() => {
    const currentSound = sound.current;

    if (currentSound && bufferLoaded) {
      if (musicEnabled) {
        currentSound.setVolume(0.5);
        if (!currentSound.isPlaying) {
          currentSound.play();
        }
      } else {
        if (currentSound.isPlaying) {
          currentSound.pause();
        }
      }
    }
  }, [musicEnabled, bufferLoaded]);

  useEffect(() => {
    if (camera.current) {
      const currentCamera = camera.current;
      currentCamera.add(listener);

      return () => {
        currentCamera.remove(listener);
      };
    }
    return () => {};
  }, [camera, listener]);

  return (
    <group ref={soundOrigin}>
      <primitive object={sound.current} />
    </group>
  );
}

export function SuspenseSound() {
  return (
    <Suspense fallback={null}>
      <Sound />
    </Suspense>
  );
}
