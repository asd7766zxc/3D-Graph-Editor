import { useEffect, useState } from 'react';
import { useSpring, animated, to } from '@react-spring/web'
import { useDrag, useGesture } from '@use-gesture/react'
import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLeftAndUpRightToCenter, faPlus  } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { windowState,windowTop,ButtonToolTip } from '../WindowState'

import './font.css'
import { useWindowDimensions } from '../../useWindowDimensions';
import './WindowStyle.css'
import { Tooltip } from 'react-tooltip';

function FloatWindow({iniX,iniY,iniW,iniH,icon,iconColor,title,children,onClose,onAdd,...props}){
    const { height, width } = useWindowDimensions();

    const [windowStates,setWindowStates] = useRecoilState(windowState);
    const [windowTops,setWindowTops] = useRecoilState(windowTop);
    const [top,setTop] = useState(10);
    const [close,setClose] = useState(props.close);

    const [display,setDisplay] = useState(props.close?"none":"block");
    
    const [{ x, y}, api] = useSpring(
        () => ({
          x: iniX,
          y: iniY,
          config: {friction: 10 },
        })
    );
    
    const [{opacity},fadeApi] = useSpring(
        () => ({
            opacity:props.close?0:1,
            onStart:(e)=>{
                setDisplay("block");
            },
            onRest:(e)=>{
            if (e.finished === true && e.value.opacity == 0) {
                setDisplay("none");
            }
          }
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
        preventDefault: true,
        filterTaps: true,
        from:() => [x.get(),y.get()]
    });
    
    const setToTopMost= ()=>{
        setWindowTops(windowTops+1);
        //this window to topmost
        setTop(windowTops);
    };
    const handleClose = () => {
        setClose(true);
        // sidebarPos;
        if(onClose) onClose();
        fadeApi({opacity:0});
    }
    useEffect(()=>{
        setClose(props.close);
        if(props.close) fadeApi({opacity:0});
        else {
            setDisplay("block");
            fadeApi({opacity:1});
        }
        //new window must on top
        setToTopMost();
    },[props.close])
    return(
        <animated.div className='absolute'
        onDragStart={(e)=>{ e.preventDefault()}} 
        style={{x,y,zIndex:top,display}}
        onClick={setToTopMost}>
            <Resizable className='flex content-center touch-none'
                defaultSize={{
                width: iniW,
                height: iniH,
            }} minHeight={ 200 } minWidth={ 300 }>
                    <animated.div className='block w-full h-full relative'
                        style={{opacity}}
                    >
                        <div className='h-[40px] relative z-10'>
                            <div className='h-full w-full flex justify-between relative pb-[8px]'>
                                <animated.div className='h-full bg-[#000000] rounded-full w-2/3 flex text-center relative shadow-[#1E1E1E_0px_0px_40px_0px] touch-none'
                                {...bind()}>
                                    <div className='h-full text-center text-xl ml-2 mr-1 content-center'>
                                        <FontAwesomeIcon icon={icon} style={{color:iconColor}} />
                                    </div>
                                    <div className='h-[85%] w-[2px] bg-[#1e1e1e] content-center mt-0.5' />
                                    <div onDragStart={(e)=>{ e.preventDefault()}} className="h-full text-white font-['DM Sans'] font-bold text-lg content-center ml-1 select-none">
                                        {title}
                                    </div>
                                </animated.div>
                                <div className='h-full 
                                bg-[#000000] rounded-full 
                                flex text-center text-xl shadow-[#5E5E5E_0px_0px_50px_0px]'
                                >
                                    <div
                                        {...ButtonToolTip}
                                        data-tooltip-content="File Manager"
                                    >
                                        <FontAwesomeIcon className='ml-3 mr-3 mt-1.5 crossTabIcon 
                                        text-[#555555] hover:text-[#FFFFFF] border-none' 
                                        icon={faPlus} onClick={(e)=>{
                                            e.preventDefault();
                                            onAdd();
                                        }}
                                        onFocus={(e)=>e.preventDefault()}
                                        />
                                    </div>

                                    <div className='h-[85%] w-[2px] bg-[#1e1e1e] content-center mt-0.5 ' />
                                    <div
                                        {...ButtonToolTip}
                                        data-tooltip-content="Minimize"
                                    >
                                        <FontAwesomeIcon className='ml-3 mr-3 mt-1.5 crossTabIcon 
                                        text-[#555555] hover:text-[#FFFFFF]' 
                                        icon={faDownLeftAndUpRightToCenter} 
                                        onClick={handleClose}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {children}
                    </animated.div>
            </Resizable>
        </animated.div>
    )
};
export default FloatWindow;
