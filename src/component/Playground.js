import Vertex from "./GraphObjects/Vertex"
import { Canvas } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei";
import {useLayoutEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import Edge from "./GraphObjects/Edge";
import { addVertex,vertices,constraintWithTree,addEdgeAbstractGraph,physics} from './AbstractGraph.js'
import * as THREE from 'three';
import Box from "./GraphObjects/Box.js";

let setVertexPos = [];
let edges = [];
let added = false;
function Playground(props){
    const [drawnVetices,setDrawnVetices] = useState([]);
    const [drawnEdges,setDrawnEdges] = useState([]);
    const [posHelper,setPosHelper] = useState([]);

    const controlRef = useRef();

    //#region GraphDataManipulation

    //Note : don't change edge moving 
    const addEdges = (_edges) => {
        setDrawnEdges([
          ...drawnEdges,
          _edges.map(([u,v])=>{
          const cnt = edges.length;
          addEdgeAbstractGraph(u,v);
          edges.push([u,v,vertices[u].pos,vertices[v].pos]);
          return (<Edge start={vertices[u].pos} end={vertices[v].pos}
                onRender = {(state,delta,setPos)=>{
                let [u,v,st,ed] = edges[cnt];
                const nst = vertices[u].pos;
                const ned = vertices[v].pos;
                edges[cnt][2] = nst;
                edges[cnt][3] = ned;
                setPos(nst,ned);
          }} />);
        })
      ]);
    }

    const addVertices = (_verts) => {
      setDrawnVetices([
        ...drawnVetices,
        _verts.map((vert)=>{
            const cnt = vertices.length;
            vert.id = cnt;
            addVertex(vert);
            return (<Vertex key={vert.id} pos={vert.pos} text={vert.text} 
              onInit={(setPos)=>{
                setVertexPos[vert.id] = setPos;
              }}
              onRender={(state,delta)=>{
              }}
              DoDrag={()=>{
                controlRef.current.enabled = false;
              }}
              Dragging={(_pos)=>{
                if(!physics) return;
                let spos = constraintWithTree(vert.id);
                for(let i = 1; i < vertices.length;++i){
                  if(vert.id == i) continue;
                  setVertexPos[i](spos[i]);
                }
              }}
              //Carefully handle dragging callback (massive calling)
              onPosChange={(pos,__pos)=>{
                vertices[vert.id].pos = __pos;
              }}
              offDrag={()=>{
                controlRef.current.enabled = true;
              }}
            />);
          })
        ])
        return _verts.map((vert)=>vert.id);
    };
    //#endregion GraphDataManipulation
    const addVertexTest = ()=>{
      let tmp = [];
      const edg = [];
      for(let i = 0; i < 10;++i){
        const pos = Array(3).fill().map(x => MathUtils.randFloatSpread(20*(i+1)) - 10*(i+1));
        tmp.push({pos:pos,text:(i+1).toString()});
      }
      tmp = addVertices(tmp);
      for(let i = 1; i < 10;++i){
        //Tree
        for(let j = 0; j < 3;++j){
            let k = Math.floor(Math.random()*10);
            if(k == i) continue;
            edg.push([tmp[i],tmp[k]]);
        }
      }
      addEdges(edg);
    };
    
    useLayoutEffect(()=>{
      if(added) return;
      added = true;
      addVertexTest();
    });

    return(
      <div className="border-4 border-dashed rounded-xl h-screen">
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
        <button className="border-4 border-dashed rounded-xl h-3" onClick={addVertexTest}>
          add
        </button>
      </div>
    )
}
export default Playground;