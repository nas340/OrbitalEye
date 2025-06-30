import { useEffect, useState } from 'react';
import { fetchData } from '../../../util/api';
import { satelliteData } from '../../../util/apiConfig';
import { SatelliteData } from '../../../types/apiTypes';
import { Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useLoader } from '@react-three/fiber';

const Satellites = () => {
  const [points, setPoints] = useState<Vector3[]>([]);

  const latLongToVector3 = (lat: number, long: number, height: number) => {
    const phi = lat * (Math.PI / 180);
    const theta = long * (Math.PI / 180);

    const R = 1;
    const r = R + height;

    const x = r * Math.cos(phi) * Math.cos(theta);
    const y = r * Math.sin(phi);
    const z = r * Math.cos(phi) * Math.sin(theta);

    return new Vector3(x, y, z);
  };

  useEffect(() => {
    fetchData(satelliteData)
      .then((data: SatelliteData[]) => {
        let points = data.map(sat => {
          const scaledHeight = (sat.height || 0) / 6371;
          return latLongToVector3(sat.latitude, sat.longitude, scaledHeight);
        });
        setPoints(points);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const materials = useLoader(MTLLoader, '/satellite.mtl');
  const obj = useLoader(OBJLoader, '/satellite.obj', loader => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(points);

  return (
    <>
      <group>
        {points &&
          points.map((pos, index) => (
            <primitive
              key={index}
              object={obj.clone()}
              position={pos}
              scale={[0.0002, 0.0003, 0.0002]} // Adjust scale as needed
              rotation={[Math.random() * 2, Math.random() * Math.PI * 2, 0]} // Random rotation around Y axis
            />
          ))}
      </group>
    </>
  );
};

export default Satellites;
