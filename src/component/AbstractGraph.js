import * as THREE from 'three';
import { atom } from 'recoil';
import Vertex from "./GraphObjects/Vertex";
import Edge from "./GraphObjects/Edge";
import React from "react";
//global cameracontrol 
const CameraControlsImpContext = React.createContext({ current: null });

const physics = true;
const scaling = 0.04;
const wheelSpeed = 20;

const mxedgelength = 100 * scaling;
const mnedgelength = 50 * scaling;

//useful for traversing
let vertices = [{text:"",pos:[0,0,0]}];
let adjacentList = [new Array()];
let revertAdjacentList = [new Array()];

//for drawing
let setVertexPos = [];
let edges = [];
const defaultGraphString = "0\n1\n2\n3\n4\n5\n0 2\n0 4\n0 5\n1 4\n1 5\n2 3\n2 4\n4 5";

//for communication between DataWindow and playground
const VertexState = atom({
    key:'DrawnVertex',
    default:[],
});

const EdgeState = atom({
    key:'DrawnEdge',
    default:[],
});


const CameraReset = atom({
    key:'CameraReset',
    default:true,
});

const GridHelper = atom({
    key:'GridHelper',
    default:true,
});


const addVertexAbstractGraph = (vert) => {
    vertices.push(vert);
    adjacentList.push([]);
    revertAdjacentList.push([]);
};

const addEdgeAbstractGraph = (u,v) => {
    adjacentList[u].push(v);
    revertAdjacentList[v].push(u);
};

//calculate the position with dfs tree
const constraintWithTree = (root) => {
    const vis = [];
    const poslist = [];
    let N = vertices.length;
    const E = [];
    for(let i = 0; i <= N;++i) E.push([]);
    for(let i = 0; i < N;++i) vis[i] = 0;
    for(let i = 0; i < N;++i) poslist[i] = vertices[i].pos;
    const dfs = (x) => {
    vis[x] = 1;
    for(let u of adjacentList[x]){
        if(vis[u]) continue;
        E[x].push(u);
        dfs(u);
    }
    for(let u of revertAdjacentList[x]){
        if(vis[u]) continue;
        E[x].push(u);
        dfs(u);
    }
    };
    dfs(root);
    const relocate = (x) => {
    for(let u of E[x]){
        const t = new THREE.Vector3(...poslist[x]);
        const r = new THREE.Vector3(...poslist[u]);
        r.sub(t);
        let len = r.length();
        len = Math.min(len,mxedgelength);
        len = Math.max(len,mnedgelength);
        r.normalize();
        r.multiplyScalar(len);
        r.add(t);
        poslist[u] = [...r];
        relocate(u);
     }
    };
    relocate(root);
    for(let i = 1; i < N;++i){
        if(i == root) continue;
        for(let j = 1; j < N;++j){
            const t = new THREE.Vector3(...poslist[i]);
            const r = new THREE.Vector3(...poslist[j]);
            t.sub(r);
            let len = t.length();
            len = Math.max(len,mnedgelength);
            t.normalize();
            t.multiplyScalar(len);
            t.add(r);
            poslist[i] = [...t];
        }
    }
    return poslist;
};

const applyGraphMotion = (id) => {
    if(!physics) return;
    let spos = constraintWithTree(id);
    for(let i = 1; i < vertices.length;++i){
        if(id == i) continue;
        setVertexPos[i](spos[i]);
    }
}

const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null
}

//turn string into clean graph data
const parseGraph = (str) => {
    const lines = str.split('\n');
    const __edges = [];
    const __verts = new Map();
    for(let line of lines){
        const tmp = line.split(' ');
        if(!tmp.length) continue;
        let v1 = tmp[0];
        if(isEmptyOrSpaces(v1) || v1.startsWith("+")) continue;
        v1 = v1.split('\r')[0];
        if(!__verts.has(v1)){
            __verts.set(v1,__verts.size+1);
        }
        if(tmp.length < 2) continue;
        let v2 = tmp[1];
        if(isEmptyOrSpaces(v2))  continue;
        v2 = v2.split('\r')[0];
        if(!__verts.has(v2)){
            __verts.set(v2,__verts.size+1);
        }
        __edges.push([__verts.get(v1),__verts.get(v2)]);
    }
    
    return [__verts,__edges];
};

//#region CreateGraphInstances
const createEdgeInstances = ([u,v,id]) => {
    return (<Edge scaling={scaling} start={vertices[u].pos} end={vertices[v].pos}
      onRender = {(state,delta,setPos)=>{
        if(!edges[id]) return;
        let [u,v,st,ed] = edges[id];
        if(!vertices[u] || !vertices[v]) return;
        const nst = vertices[u].pos;
        const ned = vertices[v].pos;
        edges[id][2] = nst;
        edges[id][3] = ned;
        setPos(nst,ned);
    }} />);
}
    
const createVertexInstance = (vert)=>{
  return (<Vertex
    wheelSpeed={wheelSpeed} 
    scaling={scaling} 
    pos={vert.pos} 
    text={vert.text} 
    onInit={(setPos)=>{
      setVertexPos[vert.id] = setPos;
    }}
    onRender={(state,delta)=>{
    }}
    DoDrag={()=>{
    }}
    Dragging={(_pos)=>{
      applyGraphMotion(vert.id);
    }}
    //Carefully handle dragging callback (massive calling)
    onPosChange={(pos,__pos)=>{
        vertices[vert.id].pos = __pos;
    }}
    offDrag={()=>{
    }}
  />);
}

//#endregion CreateGraphInstances

//CreateAbstractGraphData
const createGraph = ([_vertices,_edges]) => {
    let _verts = [{id:0,text:"dummy",pos:[0,0,0]}];
    for (let [key, value] of _vertices.entries()) {
        //1-base vertex
        let obj = {id:value,text:key,pos:[0,0,0]};
        _verts.push(obj);
    }
    let cnt = Math.min(_verts.length,(vertices.length));

    //sorted by id (very important)
    _verts.sort((a,b) => (a.id - b.id));
    for(let i = 1; i < cnt; ++i){
        _verts[i].pos = vertices[i].pos;
    }
    for(let i = cnt; i < _verts.length;++i){
        _verts[i].pos = Array(3).fill().map(x => THREE.MathUtils.randFloatSpread((i+1)));
    }

    //clean up for graph creation
    vertices = [{text:"",pos:[0,0,0]}];
    adjacentList = [new Array()];
    revertAdjacentList = [new Array()];
    const tmp = [];
    for(let i = 1; i < _verts.length;++i){
        tmp.push(_verts[i]);
    }
    let __verts = tmp.map((vert)=>{
        addVertexAbstractGraph(vert);
        return createVertexInstance(vert);
    });
    let __edgs = _edges.map(([u,v])=>{
        const id = edges.length;
        addEdgeAbstractGraph(u,v);
        edges.push([u,v,vertices[u].pos,vertices[v].pos]);
        return createEdgeInstances([u,v,id]);
    });
    return [__verts,__edgs];
}

export {
    VertexState,
    EdgeState,
    defaultGraphString,
    createGraph,
    parseGraph,
    CameraControlsImpContext,
    CameraReset,
    GridHelper,
};