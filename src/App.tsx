import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

const RotatableMesh = () => {
  const meshRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState([0, 0]);

  const onPointerDown = (event: any) => {
    setIsDragging(true);
    setLastMousePosition([event.clientX, event.clientY]);
  };

  const onPointerMove = (event: any) => {
    if (isDragging && meshRef.current) {
      const deltaX = event.clientX - lastMousePosition[0];
      const deltaY = event.clientY - lastMousePosition[1];

      meshRef.current.rotation.y += deltaX * 0.1;
      meshRef.current.rotation.x += deltaY * 0.1;

      setLastMousePosition([event.clientX, event.clientY]);
    }
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <directionalLight position={[1, 1, 1]} intensity={1}/>
      <RotatableMesh />
    </Canvas>
  );
};

export default App;
