import { useState ,useLayoutEffect, useRef, useEffect} from 'react';
import { useDrag } from '@use-gesture/react'
import { useSpring, a, to } from '@react-spring/web'
import { useWindowDimensions } from '../../useWindowDimensions'
import { windowState,graphDataWindowState,sidebarPosState,scriptWindowState, graphDataWindowStyle, scriptWindowStyle } from '../WindowState'
import './Sidebar.css'
import { useRecoilState } from 'recoil';
import WindowButton from '../WindowBase/WindowButton';

function Sidebar({props}){
    const { height, width } = useWindowDimensions();
    const [sidebarPos,setSidebarPos] = useRecoilState(sidebarPosState);
    const [graphDataWindowStates,setGraphDataWindowStates] = useRecoilState(graphDataWindowState);
    const [scriptWindow,setScriptWindow] = useRecoilState(scriptWindowState);
    const dragRef = useRef(null);
    const [{ x, y}, api] = useSpring(
        () => ({
          x: 40,
          y: window.innerHeight - 60,
          config: { friction: 10 },
          onChange:(e)=>{
            setSidebarPos([e.value.x,e.value.y]);
          },
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
        preventDefault: true,
        filterTaps: true,
        from:() => [x.get(),y.get()]
    });
    useEffect(()=>{
    });
    //{...bind()}
    return (
        <a.div style={{x,y}} {...bind()}
               className='w-[200px] h-[50px] absolute z-[999] touch-none'>
            <div className='glassPanel w-full h-full pt-[7px] pl-[8px] flex'>

                <WindowButton onClick={()=>{
                    setGraphDataWindowStates(!graphDataWindowStates);
                }} btnState={graphDataWindowStates} 
                {...graphDataWindowStyle}  />

                <div className='h-[85%] w-[2px] bg-transparent ml-1 mr-1'/>

                <WindowButton onClick={()=>{
                    setScriptWindow(!scriptWindow);
                }} btnState={scriptWindow} 
                {...scriptWindowStyle}  />
                <div className='h-[85%] w-[2px] bg-transparent ml-1 mr-1'/>
                <div className='h-[85] w-[2px] bg-[#2e2e2e] ml-1 mr-1 mb-1.5'/>

            </div>
        </a.div>
    );
};
export default Sidebar;
