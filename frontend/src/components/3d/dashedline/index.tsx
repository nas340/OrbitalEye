import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const DashedLine = () => {
  const lineRef = useRef<any>({});
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.dashOffset -= 0.03;
    }
  });
  return (
    <>
      <Line
        ref={lineRef}
        dashed
        dashSize={1}
        dashScale={10}
        dashOffset={0}
        lineWidth={1}
        rotation={[0, 0, -0.23]}
        points={[
          [0, 1.5, 0],
          [0, -1.6, 0],
        ]}
      />
    </>
  );
};

export default DashedLine;
