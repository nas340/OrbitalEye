import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';

interface mousePosition {
  position: {
    x: number;
    y: number;
  };
}

const Stars = () => {
  const starsRef = useRef<mousePosition>({
    position: {
      x: 0,
      y: 0,
    },
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const positions = useMemo(() => {
    const pos = [];
    const starCount = 10000;

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;

      if (Math.sqrt(x * x + y * y + z * z) < 100) {
        continue;
      }
      pos.push(x, y, z);
    }

    return new Float32Array(pos);
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      const targetX = mousePosition.x * 10;
      const targetY = mousePosition.y * 10;

      starsRef.current.position.x +=
        (targetX - starsRef.current.position.x) * 0.05;
      starsRef.current.position.y +=
        (targetY - starsRef.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[positions, 3]}
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={0.5} sizeAttenuation={true} />
      </points>
    </>
  );
};

export default Stars;
