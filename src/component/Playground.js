import Box from "./GraphObjects/Box";
import { Canvas } from '@react-three/fiber'
import { AsciiRenderer, CameraControls } from "@react-three/drei";
function Playground(props){
    return(
      <div class="border-4 border-dashed rounded-xl h-screen">
         <Canvas>
            <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
          </Canvas>
      </div>
    )
}
export default Playground;