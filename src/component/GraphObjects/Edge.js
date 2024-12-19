
import * as THREE from 'three'
import { useLayoutEffect, useRef } from 'react'
import { useFrame,extend } from '@react-three/fiber'
import { Line2, LineGeometry, LineMaterial } from 'three/examples/jsm/Addons.js'

extend({Line2,LineMaterial,LineGeometry})
function Edge({scaling, start,end,onRender,...props }){

    const ref = useRef()
    const setPos = (st,ed) => {
      const startVec = new THREE.Vector3(...st);
      const endVec = new THREE.Vector3(...ed);
      const direction = new THREE.Vector3();
      direction.copy(endVec);
      direction.sub(startVec);
      direction.normalize();
      direction.multiplyScalar(10 * scaling);
      //make endpoint farther to vertex center
      startVec.add(direction);
      endVec.sub(direction);
      ref.current.geometry.setFromPoints([startVec,endVec]);
      ref.current.geometry.setColors([255,255,255]);
    }

    useFrame((state,delta)=>{
        onRender(state,delta,setPos);
    });
    useLayoutEffect(() => {
      setPos(start,end);
    })
    return (
      <line2 ref={ref}
      scale={[1,1,1]}
      >
        <lineGeometry />
        <lineMaterial args={[{color: 0xffffff,
					linewidth: 5 , 
					vertexColors: false,
					dashed: false,
					alphaToCoverage: true} ]} />
      </line2>
    )
}
export default Edge;