import { useFrame,extend, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { CircleGeometry, MeshBasicMaterial, RingGeometry } from 'three';
import { useEffect, useState } from 'react';

extend({ RingGeometry,MeshBasicMaterial,CircleGeometry});
//The styling layer of vertex
function VertexShape({hovered,
    text,
    scaling,
    ringColor,
    radiusInner,
    radiusOuter,
    cirlceStep,
    bgOpacity,
    bgHover,
    ringHover,
    bgColor,
    fontSize,
    textPos,
    ...prop}){
    return(
        <group>
            <Text 
            color="white" 
            anchorX="center" 
            anchorY="middle"
            position={textPos}
            fontSize={fontSize * scaling}>
                {text}
            </Text>

            <mesh >
                <ringGeometry args={[radiusInner * scaling,radiusOuter * scaling,cirlceStep]}/>
                <meshBasicMaterial args={[ {color:hovered ? ringHover : ringColor} ]} />
            </mesh>
            <mesh>
                <circleGeometry args={[radiusInner * scaling,cirlceStep]}/>
                <meshBasicMaterial args={[ {transparent :true,color:hovered ? bgHover : bgColor,opacity : bgOpacity} ]} />
            </mesh>

        </group>
    );
}
export default VertexShape;