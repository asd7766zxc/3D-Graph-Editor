import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, a, to } from '@react-spring/web'
import { useEffect } from 'react';
import { useWindowDimensions } from '../../useWindowDimensions';
import { ButtonToolTip } from '../WindowState';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

let URL = `https://github.com/asd7766zxc/3D-Graph-Editor`; 
function LinkToGitHub(){
    const { height, width } = useWindowDimensions();
    const [{ x, y}, api] = useSpring(
        () => ({
          x: window.innerWidth-80,
          y: window.innerHeight-50,
          config: { friction: 10 },
        })
    );

    useEffect(()=>{
        api({x:width-80,y:height-50});
    },[height,width]);
   
    return(
        <a.div 
            className="absolute"
            style={{x,y}}
        >
            <div
                {...ButtonToolTip}
                data-tooltip-content={"Repository"}
            >
                <div className="text-3xl text-[#5F5F5F] hover:text-[#FFFFFF]">
                    <FontAwesomeIcon icon={faGithub} className="crossTabIcon" onClick={()=>{
                        window.open(URL,'_blank');
                    }} />
                </div>
            </div>
        </a.div>
    )
}

export default LinkToGitHub;