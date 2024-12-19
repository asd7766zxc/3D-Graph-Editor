import { useFrame,extend, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { CircleGeometry, MeshBasicMaterial, RingGeometry } from 'three';

extend({ RingGeometry,MeshBasicMaterial,CircleGeometry});
//The styling layer of vertex
function VertexShape({hovered,text,scaling,...prop}){
    return(
        <group>
            <Text 
            color="white" anchorX="center" anchorY="middle"
            fontSize={4 * scaling}>
                {text}
            </Text>

            <mesh >
                <ringGeometry args={[4.5 * scaling,5 * scaling,1000]}/>
                <meshBasicMaterial args={[ {color:hovered ? 0xffffff : 0xff0000} ]} />
            </mesh>
            <mesh>
                <circleGeometry args={[5 * scaling,1000]}/>
                <meshBasicMaterial args={[ {transparent :true,color:hovered ? 0xffffff : 0x000000,opacity : 0} ]} />
            </mesh>

        </group>
    );
}
export default VertexShape;