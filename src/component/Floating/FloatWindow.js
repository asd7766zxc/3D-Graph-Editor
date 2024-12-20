import { useEffect, useState } from 'react';
import { useSpring, animated, to } from '@react-spring/web'
import { useDrag, useGesture } from '@use-gesture/react'
import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark  } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { windowState,windowTop } from './WindowState'

import './font.css'
import './FloatWindow.css'
import { useWindowDimensions } from '../useWindowDimensions';

function EditorWindow({icon,iconColor,title,children,onClose,...props}){
    const { height, width } = useWindowDimensions();
    const [windowStates,setWindowStates] = useRecoilState(windowState);
    const [windowTops,setWindowTops] = useRecoilState(windowTop);
    const [top,setTop] = useState(10);
    const [close,setClose] = useState(false);

    const [{ x, y}, api] = useSpring(
        () => ({
          x: 40,
          y: 40,
          config: {friction: 10 },
        })
    );
    
   const bind = useDrag(({ active, offset: [x, y],tap }) =>{
        x = Math.max(x,40);
        y = Math.max(y,40);
        x = Math.min(x,width-220);
        y = Math.min(y,height-40);
        api.start({x,y});
    },
    {
        from:() => [x.get(),y.get()]
    });
    
    const setToTopMost= ()=>{
        setWindowTops(windowTops+1);
        //this window to topmost
        setTop(windowTops);
    };
    const handleClose = () => {
        setClose(true);
        if(onClose) onClose();
    }
    useEffect(()=>{
        setClose(props.close);
        //new window must on top
        setToTopMost();
    },[props.close])
    return(
        <animated.div className='absolute' 
        onDragStart={(e)=>{ e.preventDefault()}} 
        style={{x,y,zIndex:top,display:close?'none':'block'}}
        onClick={setToTopMost}>
            <Resizable className='flex content-center'
                defaultSize={{
                width: 400,
                height: 400,
                }} minHeight={ 200 } minWidth={ 300 }>
                    <div className='block w-full h-full relative'>
                        <div className='h-[40px] relative z-10'>
                            <div className='h-full w-full flex justify-between relative pb-[8px]'>
                                <animated.div className='h-full bg-[#000000] rounded-full w-2/3 flex text-center relative shadow-[#1E1E1E_0px_0px_40px_0px]'
                                {...bind()}>
                                    <div className='h-full text-center text-xl ml-2 mr-1 content-center'>
                                        <FontAwesomeIcon icon={icon} style={{color:iconColor}} />
                                    </div>
                                    <div className='h-[85%] w-[2px] bg-[#1e1e1e] content-center mt-0.5'>
                                    </div>
                                    <div onDragStart={(e)=>{ e.preventDefault()}} className="h-full text-white font-['DM Sans'] font-bold text-lg content-center ml-1 select-none">
                                        {title}
                                    </div>
                                </animated.div>
                                <div className='h-full bg-[#000000] rounded-full w-[32px] text-center text-2xl text-red-500 shadow-[#5E5E5E_0px_0px_50px_0px] '
                                 onClick={handleClose}
                                 >
                                    <FontAwesomeIcon icon={faXmark} className='crossIcon'/>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
            </Resizable>
        </animated.div>
    )
};
export default EditorWindow;
