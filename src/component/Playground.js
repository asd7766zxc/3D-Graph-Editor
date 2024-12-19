import { Canvas } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei";
import { useRecoilState } from 'recoil';
import {VertexState,EdgeState, parseGraph, createGraph, defaultGraphString,CameraControlsImpContext} from './AbstractGraph.js'
import React from "react";
import { useLayoutEffect, useRef,useEffect } from 'react';

let added = false;
function Playground(props){
    const [drawnVertices,setDrawnVertices] = useRecoilState(VertexState);
    const [drawnEdges,setDrawnEdges] = useRecoilState(EdgeState);
    const refCameraControlsImpApi = React.useContext(CameraControlsImpContext);
    let controlRef = null;

    React.useImperativeHandle(refCameraControlsImpApi, () => ({
      enable: (enable) =>{
        controlRef.enabled = enable;
      },
    }));
    
    useLayoutEffect(()=>{
      if(added) return;
      added = true;
      const [_verts,_edges] = createGraph(parseGraph(defaultGraphString));
      setDrawnVertices(_verts);
      setDrawnEdges(_edges);
    });

    return(
      <div className="h-screen w-screen absolute">
         <Canvas>
            <CameraControls ref={(selfref)=>{
              controlRef = selfref;
              if(controlRef){
                controlRef.setLookAt(3,3,3,0,0,0,true);
              }
            }} minPolarAngle={0} maxPolarAngle={Math.PI / 1.6}
             />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <gridHelper />
            <group>
                {drawnVertices.map(data => data)}
                {drawnEdges.map(data => data)}
            </group>
          </Canvas>
      </div>
    )
}
export default Playground;