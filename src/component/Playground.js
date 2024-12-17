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

    //#region GraphDataManipulation
    const addEdgeAbstractGraph = (u,v) => {
        edges.push([u,v]);
        if(!adjacentList[u]) adjacentList[u] = new Array();
        if(!revertAdjacentList[v]) revertAdjacentList[v] = new Array();
        adjacentList[u].push(v);
        revertAdjacentList[v].push(u);
    };

    const addEdges = (_edges) => {
        setDrawnEdges([
          ...drawnEdges,
          _edges.map(([u,v])=>{
          const cnt = edges.length;
          addEdgeAbstractGraph(u,v);
          return (<Edge start={vertices[u].pos} end={vertices[v].pos}
                onRender = {(state,delta,setPos)=>{
                const start = vertices[edges[cnt][0]].pos;
                const end   = vertices[edges[cnt][1]].pos;
                setPos(start,end);
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
            vertices.push(vert);
            return (<Vertex key={vert.id} pos={vert.pos} text={vert.text} 
              onRender={(state,delta,setPos)=>{
                // vertices[cnt].pos = [x+Math.random()*4,y+Math.random()*4,z+Math.random()*4];
                // setPos(vertices[cnt].pos);
              }}
              DoDrag={()=>{
                controlRef.current.enabled = false;
              }}
              //Carefully handle dragging callback (massive calling)
              onPosChange={(pos)=>{
                vertices[vert.id].pos = pos;
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
          const pos = Array(3).fill().map(x => MathUtils.randFloatSpread(50*(i+1)) - 25*(i+1));
          tmp.push({pos:pos,text:(i+1).toString()});
        }
        tmp = addVertices(tmp);
        for(let i = 1; i < 10;++i){
          //Tree
            let k = Math.floor(Math.random()*i);
            edg.push([tmp[i],tmp[k]]);
        }
        addEdges(edg);
    };
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