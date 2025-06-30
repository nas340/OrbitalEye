import { Html, useProgress } from '@react-three/drei';

const AssetLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="text-white text-5xl font-thin animate-pulse w-screen flex items-center justify-center px-4 py-2 rounded-lg">
        🚀 Initializing launch {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

export default AssetLoader;
