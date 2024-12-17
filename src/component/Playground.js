import Vertex from "./GraphObjects/Vertex"
import { Canvas } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import Edge from "./GraphObjects/Edge";

let vertices = [{text:"",pos:[0,0,0]}];
let adjacentList = [];
let revertAdjacentList = [];
let edges = [];

function Playground(props){
    const [drawnVetices,setDrawnVetices] = useState([]);
    const [drawnEdges,setDrawnEdges] = useState([]);

    const controlRef = useRef();
    const addEdge = (u,v) => {
      const cnt = edges.length;
      edges.push([u,v]);
      if(!adjacentList[u]) adjacentList[u] = new Array();
      if(!revertAdjacentList[v]) revertAdjacentList[v] = new Array();
      adjacentList[u].push(v);
      revertAdjacentList[v].push(u);
      setDrawnEdges([
        ...drawnEdges,
        <Edge start={vertices[u].pos} end={vertices[v].pos}
        onRender = {(state,delta,setPos)=>{
            setPos(vertices[edges[cnt][0]].pos,vertices[edges[cnt][1]].pos);
        }} />
      ]);
    }
    const addVertex = () => {
        const cnt = vertices.length;
        const pos = Array(3).fill().map(x => MathUtils.randFloatSpread(50*cnt) + 10*cnt);
        vertices.push({
          text:cnt.toString(),
          pos:pos,
        });
        addEdge(Math.floor(Math.random() * (cnt-1))+1,cnt);
        setDrawnVetices([
            ...drawnVetices,
            <Vertex key={cnt} pos={pos} text={vertices[cnt].text} 
              onRender={(state,delta,setPos)=>{
                // vertices[cnt].pos = [x+Math.random()*4,y+Math.random()*4,z+Math.random()*4];
                // setPos(vertices[cnt].pos);
              }}
              DoDrag={()=>{
                controlRef.current.enabled = false;
              }}
              //Carefully handle dragging callback (massive calling)
              onPosChange={(pos)=>{
                vertices[cnt].pos = pos;
              }}
              offDrag={()=>{
                controlRef.current.enabled = true;
              }}
            />
        ])
    };

    return(
      <div class="border-4 border-dashed rounded-xl h-screen">
         <Canvas>
            <CameraControls ref={controlRef} minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <group>
                {[...drawnVetices]}
                {[...drawnEdges]}
            </group>
          </Canvas>
        <button class="border-4 border-dashed rounded-xl h-3" onClick={addVertex}>
          add
        </button>
      </div>
    )
}
export default Playground;