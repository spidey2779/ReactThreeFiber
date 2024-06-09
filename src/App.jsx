import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
const Cube = ({ position, size, color }) => {
  const myref = useRef(null);

  useFrame((state, delta) => {
    // console.log(state)
    myref.current.rotation.x += delta;
    myref.current.rotation.y += delta;
    myref.current.position.z = Math.cos(state.clock.elapsedTime) * 2;
  });
  return (
    <mesh position={position} ref={myref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
const Sphere = ({ position, size }) => {
  const myref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 0.2 : 0.5;
    // myref.current.rotation.x += delta;
    myref.current.rotation.y += delta * speed;
    // myref.current.position.z = Math.cos(state.clock.elapsedTime)*2;
  });
  return (
    <mesh
      position={position}
      ref={myref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked((prev) => !prev)}
      scale={isClicked ? 1.4 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={!isHovered ? "red" : "green"} wireframe />
    </mesh>
  );
};
const Torus = ({ position, size, color }) => {
  const ref = useRef(null);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });
  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
const TorusKnot = ({ position, size, color }) => {
  const ref = useRef(null);
  const { rad } = useControls({
    rad: {
      value: 1,
      min: 1,
      max: 20,
      step: 1,
    },
  });
  useFrame((state, delta) => {
    // ref.current.rotation.x += delta;
    // ref.current.rotation.y += delta * 2;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[rad,...size]} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial color={color} factor={5} speed={2} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef(null);
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "red");
  const { lightIntensity, knotColor } = useControls({
    knotColor: "white",
    lightIntensity: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.5,
    },
  });
  return (
    <>
      <directionalLight
        position={[0, 0, 2]}
        intensity={2}
        ref={directionalLightRef}
      />
      <ambientLight intensity={lightIntensity} />
      {/* <group position={[2,0,0]}>
        <Cube position={[1, 0, 0]} size={[1, 1, 1]} color={"hotpink"} />
        <Cube position={[-1, 0, 0]} size={[1, 1, 1]} color={"green"} />
        <Cube position={[-1, 2, 0]} size={[1, 1, 1]} color={"yellow"} />
        <Cube position={[1, 2, 0]} size={[1, 1, 1]} color={"red"} />
      </group> */}
      {/* <Cube position={[1, 0, 0]} size={[1, 1, 1]} color={"hotpink"} /> */}
      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"red"} /> */}
      {/* <Torus position={[-1, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"} /> */}
      <TorusKnot
        position={[0, 0, 0]}
        size={[ 0.1, 200, 50]}
        color={knotColor}
      />
      <OrbitControls enableZoom={false} />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
