import * as THREE from 'three';
const dt = 1e-8;
const eps = 1e-8;
const mxedgelength = 100;
const mnedgelength = 50;
const physics = true;

//dummy item for 1-base array
let vertices = [{text:"",pos:[0,0,0]}];
let adjacentList = [new Array()];
let revertAdjacentList = [new Array()];

const sgn = (u,v)=>{
    const x = new THREE.Vector3(...u);
    const y = new THREE.Vector3(...v);
    x.sub(y);
    if(x.length() >  eps) return 1;
    if(x.length() < -eps) return -1;
    return 0;
};
const abs = (u)=>{
    const x = new THREE.Vector3(...u);
    return x.length();
};
const sub = (u,v)=>{
    const x = new THREE.Vector3(...u);
    const y = new THREE.Vector3(...v);
    x.sub(y);
    return [...x];
};
const toVec = (u)=>{
    const x = new THREE.Vector3(...u);
    return x;
};

const addVertex = (vert)=>{
    vertices.push(vert);
    adjacentList.push([]);
    revertAdjacentList.push([]);
};

const addEdgeAbstractGraph = (u,v) => {
    adjacentList[u].push(v);
    revertAdjacentList[v].push(u);
};

const constraintWithTree = (root) => {
    const vis = [];
    const poslist = [];
    let N = vertices.length;
    const E = [];
    for(let i = 0; i <= N;++i) E.push([]);
    for(let i = 1; i <= N;++i) vis[i] = 0;
    for(let i = 1; i < N;++i) poslist[i] = vertices[i].pos;
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
export {addVertex,vertices,constraintWithTree,addEdgeAbstractGraph,physics};