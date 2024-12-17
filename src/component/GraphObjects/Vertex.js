import { useLayoutEffect,useRef, useState } from 'react'
import { useFrame,extend, useThree } from '@react-three/fiber'

import myFont from './Consolas_Regular.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { BackSide, RingGeometry, MeshBasicMaterial, Vector3, CircleGeometry,PlaneHelper } from 'three'
import { Text, Texture } from '@react-three/drei'
import { useGesture } from "react-use-gesture"
import { useSpring, a } from "@react-spring/three"

import * as THREE from 'three'
extend({ RingGeometry,MeshBasicMaterial,CircleGeometry,PlaneHelper})

const position = new THREE.Vector3();
const plane = new THREE.Plane();
const intersection = new THREE.Vector3();
const offset = new THREE.Vector3();
const inverseMatrix = new THREE.Matrix4();

//Current vertex's position
let __pos = [];
let wheeloffset = 0;

function Vertex({ pos,text,onRender,DoDrag,onPosChange,offDrag,...props }) {
    const font = new FontLoader().parse(myFont);
    const camera = useThree((state) => state.camera);
    const get = useThree((state) => state.get);
    const { size, viewport } = useThree()

    const [hovered, setHover] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [helperplane, setHelperplane] = useState([])

    const textRef = useRef();
    const ringRef = useRef();
    const circleRef = useRef();
    const groupRef = useRef();
    const planeRef = useRef();

    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => 
        ({ scale: [1, 1, 1], position: pos, rotation: [0, 0, 0], config: { friction: 10 }
        ,onChange: (result,spring,item)=>{
            //Calling adjacent objects to relocate
            onPosChange(result.value.position);
            __pos = result.value.position;
        },OnDestroyed:()=>{
            
        }}))
    const getCameraVertexVec = ()=> {
        position.copy(new Vector3(...__pos));
        const cpos = new Vector3(0,0,0);
        camera.getWorldDirection(cpos);
        cpos.normalize();
        return cpos;
    };
    const bind = useGesture({
        onDrag: () => {
        const cpos = getCameraVertexVec();
        //dragging on a plane perpendicular to camera 
        plane.setFromNormalAndCoplanarPoint(cpos, position);
        get().raycaster.ray.intersectPlane(plane,intersection);
        set({ position: [...intersection]})
      },
      onWheel: (e)=>{
        const cpos = getCameraVertexVec();
        cpos.multiplyScalar(-1);
        let delta = e.values[1] - wheeloffset;
        if(delta){
            cpos.multiplyScalar((Math.abs(delta)/delta)*20);
            console.log("1",cpos,position);
            cpos.add(position);
            console.log("2",cpos,position);
            set({ position: [...cpos]});
        }
        wheeloffset = e.values[1];
      },
    //   onHover: ({ hovering }) => {
    //         console.log(hovering)
    //         set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
    //     }
    });

    const applyPos = (_pos)=>{
        __pos = _pos;
        set({ position: __pos});
    };

    //Direct set (skip animation)
    const setPos = (_pos)=>{
        __pos = _pos;
        onPosChange(__pos);
        groupRef.current.position.set(...__pos);
    };

    useFrame((state, delta) => {
        ringRef.current.lookAt(camera.position);
        textRef.current.lookAt(camera.position);
        circleRef.current.lookAt(camera.position);
        onRender(state,delta,setPos);
    })


    return (
        <a.group
            {...spring} {...bind()}
            ref = {groupRef}
            onPointerOver={(e) => {
                DoDrag();
                setHover(true)
            }}
            onPointerOut={(e) => {
                offDrag();
                setHover(false)
            }}
        >
            {[...helperplane]}
            <Text 
            ref = {textRef}
            color="white" anchorX="center" anchorY="middle"
            fontSize={4}>
                {text}
            </Text>

            <mesh 
             ref = {ringRef}
            >
                <ringGeometry args={[4.5,5,1000]}/>
                <meshBasicMaterial args={[ {color:hovered ? 0xffffff : 0xff0000} ]} />
            </mesh>
            <mesh
                ref = {circleRef}
            >
                <circleGeometry args={[5,1000]}/>
                <meshBasicMaterial args={[ {transparent :true,color:hovered ? 0xffffff : 0x000000,opacity : 0} ]} />
            </mesh>
        </a.group>
    )
  }
export default Vertex;