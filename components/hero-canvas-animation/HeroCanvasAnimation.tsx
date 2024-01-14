'use client';
import { MathUtils } from 'three';
import { useContext, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, Environment } from '@react-three/drei';
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing';
import COLORS from '@app/constants/color';
import { MouseContext } from './MouseContext';

const particles = Array.from({ length: 30 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: MathUtils.randFloatSpread(40),
  yFactor: MathUtils.randFloatSpread(10),
  zFactor: MathUtils.randFloatSpread(10),
}));

export const HeroCanvasAnimation: React.FC = () => {
  const mousePosition = useContext(MouseContext);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ fov: 50, position: [0, 0, 20] }}
    >
      <color attach='background' args={[COLORS.black]} />
      <fog attach='fog' args={[COLORS.orange, 20, -5]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Bubbles mousePosition={mousePosition} />

      <EffectComposer disableNormalPass>
        <N8AO aoRadius={6} intensity={20} color={COLORS.orange} />
        <TiltShift2 blur={0.2} />
      </EffectComposer>
      <Environment preset='city' />
    </Canvas>
  );
};

interface BubblesProps {
  mousePosition: { x: number; y: number };
}

const Bubbles: React.FC<BubblesProps> = ({ mousePosition }) => {
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      // Convert window coordinates to [-1, 1] range for both axes
      const x = (mousePosition.x / window.innerWidth) * 2 - 1;
      const y = -(mousePosition.y / window.innerHeight) * 2 + 1;

      ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-x * Math.PI) / 6,
        2.75,
        0.01
      );
    }
  });

  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 2.5, 0]}
    >
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial roughness={1} color={COLORS.cyan} />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
};

interface BubbleProps {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }: BubbleProps) {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 4
    );
  });
  return <Instance ref={ref} />;
}
