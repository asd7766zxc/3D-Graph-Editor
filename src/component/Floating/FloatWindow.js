import { useState ,useLayoutEffect} from 'react';
import { useSpring, animated, to } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark  } from '@fortawesome/free-solid-svg-icons'
import './font.css'
import './FloatWindow.css'

function EditorWindow({children}){
    const [{ x, y}, api] = useSpring(
        () => ({
          x: 400,
          y: 400,
          config: {friction: 10 },
        })
    );
    const bind = useGesture({
        onDrag: ({ active, offset: [x, y] }) =>{
            x = Math.max(x,40);
            y = Math.max(y,40);
            api({ x, y });
        }
    });
    return(
        <animated.div className='absolute z-10' style={{x,y}}>
            <Resizable className='flex content-center'
                defaultSize={{
                width: 400,
                height: 400,
                }} minHeight={ 200 } minWidth={ 300 }>
                    <div className='block w-full h-full relative'>
                        <animated.div className='h-[40px] relative z-10' {...bind()}>
                            <div className='h-full w-full flex justify-between relative pb-[8px]'>
                                <div className='h-full bg-[#000000] rounded-full w-2/3 flex text-center relative shadow-[#1E1E1E_0px_0px_40px_0px]'>
                                    <div className='h-full text-center text-xl text-green-500 ml-2 mr-1 content-center'>
                                        <FontAwesomeIcon icon="fa-circle-nodes" />
                                    </div>
                                    <div className='h-[85%] w-[2px] bg-[#1e1e1e] content-center mt-0.5'>
                                    </div>
                                    <div className="h-full text-white font-['DM Sans'] font-bold text-lg content-center ml-1 select-none">
                                        Graph Data
                                    </div>
                                </div>
                                <div className='h-full bg-[#000000] rounded-full w-[32px] text-center text-2xl text-red-500 shadow-[#5E5E5E_0px_0px_50px_0px]'
                                 onClick={()=>{

                                 }}
                                 >
                                    <FontAwesomeIcon icon={faXmark} className='crossIcon'/>
                                </div>
                            </div>
                        </animated.div>
                        {children}
                    </div>
            </Resizable>
        </animated.div>
    )
};
export default EditorWindow;
