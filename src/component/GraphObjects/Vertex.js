import { useEffect, useLayoutEffect,useRef, useState } from 'react'
import { useFrame,extend, useThree } from '@react-three/fiber'

import myFont from './Consolas_Regular.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import {Vector3,PlaneHelper } from 'three'
import { useGesture } from "react-use-gesture"
import { useSpring, a } from "@react-spring/three"
import React from "react";
import {CameraControlsImpContext, physicsState} from '../AbstractGraph'
import * as THREE from 'three'

import VertexShape from './VertexShape'
import { useRecoilState } from 'recoil'
extend({ PlaneHelper})

const position = new THREE.Vector3();
const plane = new THREE.Plane();
const intersection = new THREE.Vector3();
let elapsed = 0;

//Current vertex's position
let __pos = [];
let wheeloffset = 0;
let animationLock = false;
//Abstract vertex
function Vertex({
    wheelSpeed,
    scaling,
    pos,text,
    onInit,onRender,
    DoDrag,Dragging,
    onPosChange,offDrag
    ,color,radius,
    vertStyle,
    updating,
    GraphID,
    ...props }) {
    const CameraControlApi = React.useContext(CameraControlsImpContext);

    const font = new FontLoader().parse(myFont);
    const camera = useThree((state) => state.camera);
    const get = useThree((state) => state.get);
    const { size, viewport } = useThree()

    const [physics,setPhysics] = useRecoilState(physicsState);
    
    const [hovered, setHover] = useState(false)
    const [textPos, setTextPos] = useState([0,0,0])
    const [helperplane, setHelperplane] = useState([])
    const [thisID,setThisID] = useState(GraphID);

    const [styling, setStyling] = useState(vertStyle);

    const groupRef = useRef();
    const planeRef = useRef();

    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => 
        ({ scale: [1, 1, 1], position: pos, rotation: [0, 0, 0], config: { friction: 10 }
        ,onChange: (result,spring,item)=>{
            //Calling adjacent objects to relocate
            onPosChange(__pos,result.value.position);
            __pos = result.value.position;
        },onRest:()=>{
            animationLock = true;
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

        //used to update moving tree
        const cpos = getCameraVertexVec();

        //dragging on a plane perpendicular to camera 
        plane.setFromNormalAndCoplanarPoint(cpos, position);
        get().raycaster.ray.intersectPlane(plane,intersection);

        //physics state
        if(physics) Dragging([...intersection]);
        set({ position: [...intersection]})
      },
      onWheel: (e)=>{
        const cpos = getCameraVertexVec();
        cpos.multiplyScalar(-1);
        let delta = e.values[1] - wheeloffset;
        if(delta){
            cpos.multiplyScalar((Math.abs(delta)/delta) * wheelSpeed * scaling);
            cpos.add(position);
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
        set({ position: _pos});
    };

    //Direct set (skip animation)
    const setPos = (_pos)=>{
        onPosChange(__pos,_pos);
        __pos = _pos;
        groupRef.current.position.set(...__pos);
    };
    const setStyle = (_style) => {
        setStyling(_style);
    }
    useFrame((state, delta) => {
        elapsed++;
        //Offset Text
        let vecCam = new Vector3(0,0,0);
        vecCam.copy(camera.position);
        let vecCur = groupRef.current.position;
        vecCam.sub(vecCur);
        vecCam.normalize();
        vecCam.multiplyScalar(-0.01);
        //kinda buggy
        // setTextPos([...vecCam]);
        
        groupRef.current.lookAt(camera.position);
        onRender(elapsed,state,delta,setPos,setStyle,styling);
    })
    useLayoutEffect(()=>{
        onInit(applyPos);
        if(thisID === GraphID) return;
        setThisID(GraphID);
        //Hard resetting
        elapsed = 0;
        setStyling(vertStyle);
        setPos(pos);
    })

    return (
        <a.group
            {...spring} {...bind()}
            ref = {groupRef}
            onPointerOver={(e) => {
                DoDrag();
                CameraControlApi.current.enable(false);
                setHover(true)
            }}
            onPointerOut={(e) => {
                offDrag();
                CameraControlApi.current.enable(true);
                setHover(false)
            }}
        >
            {[...helperplane]}
            <VertexShape 

                hovered={hovered} 
                textPos={textPos}
                {...styling}
             />
        </a.group>
    )
  }
export default Vertex;