import { useState ,useLayoutEffect, useRef} from 'react';
import { useDrag } from '@use-gesture/react'
import { useSpring, a, to } from '@react-spring/web'
import { useWindowDimensions } from '../useWindowDimensions'
import { windowState,graphDataWindowState } from './WindowState'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';
import WindowButton from './WindowButton';

function Sidebar({props}){
    const { height, width } = useWindowDimensions();
    const [graphDataWindowStates,setGraphDataWindowStates] = useRecoilState(graphDataWindowState);
    const dragRef = useRef(null);
    const [{ x, y}, api] = useSpring(
        () => ({
          x: 40,
          y: window.innerHeight - 60,
          config: { friction: 10 }
        })
    );
    const bind = useDrag(({ active, offset: [x, y],tap }) =>{
        x = Math.max(x,40);
        y = Math.max(y,40);
        x = Math.min(x,width-220);
        y = Math.min(y,height-60);
        api.start({x,y});
    },
    {
        from:() => [x.get(),y.get()]
    });
    //{...bind()}
    return (
        <a.div style={{x,y}} {...bind()}
               className='w-[200px] h-[50px] absolute z-[999] touch-none'>
            <div className='glassPanel w-full h-full pt-[7px] pl-[8px] flex'>
                <WindowButton onClick={()=>{
                    setGraphDataWindowStates(true);
                }} btnState={graphDataWindowStates} 
                icon={"fa-circle-nodes"} 
                iconColor={"#22c55e"} 
                title={"Graph Data"}  />

                <div className='h-[85%] w-[2px] bg-[#2e2e2e] ml-1 mr-1'/>

                <WindowButton onClick={()=>{
                    setGraphDataWindowStates(true);
                }} btnState={graphDataWindowStates} 
                icon={"fa-code"} 
                iconColor={"#2196F3"} 
                title={"Graph Data"}  />

                <div className='h-[85%] w-[2px] bg-[#2e2e2e] ml-1 mr-1'/>

                <WindowButton onClick={()=>{
                    setGraphDataWindowStates(true);
                }} btnState={graphDataWindowStates} 
                icon={"fa-palette"} 
                iconColor={"#D50000"} 
                title={"Graph Data"}  />

                <div className='h-[85%] w-[2px] bg-[#2e2e2e] ml-1 mr-1'/>
                
                        
            </div>
        </a.div>
    );
};
export default Sidebar;
