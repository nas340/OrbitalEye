import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import './style.css';
import { TextureLoader, AdditiveBlending } from 'three';
import DashedLine from '../dashedline';
import Stars from '../stars';
import Satellites from '../satellites';

const Earth = () => {
  const earthTexture = useLoader(TextureLoader, '/earth.jpg');
  const cloudsTexture = useLoader(TextureLoader, '/clouds.jpg');
  const lightsTexture = useLoader(TextureLoader, '/lights.jpg');

  const time = new Date();
  const rotationDegrees = (360 * time.getUTCHours()) / 24;

  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 2],
        }}
      >
        <group position={[0, 0, 0]} rotation={[0, rotationDegrees * 0.0174, 0]}>
          <mesh>
            <icosahedronGeometry args={[1, 12]} />
            <meshPhongMaterial map={earthTexture} />
          </mesh>
          <mesh scale={1.02}>
            <icosahedronGeometry args={[1, 12]} />
            <meshStandardMaterial
              map={cloudsTexture}
              transparent
              opacity={1}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[1, 12]} />
            <meshStandardMaterial
              map={lightsTexture}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
        <DashedLine />
        <Stars />
        <Satellites />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 0, 1]} color="white" intensity={3} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Earth;
