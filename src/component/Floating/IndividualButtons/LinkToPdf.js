import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, a, to } from '@react-spring/web'
import { useEffect } from 'react';
import { useWindowDimensions } from '../../useWindowDimensions';
import { ButtonToolTip } from '../WindowState';

let PDFURL = `https://drive.google.com/file/d/1sDvAzTHmlBnI28yNnllNOuUF5hN6gqGP/view?usp=sharing`; 
function LinkToPdf(){
    const { height, width } = useWindowDimensions();
    const [{ x, y}, api] = useSpring(
        () => ({
          x: window.innerWidth-40,
          y: window.innerHeight-50,
          config: { friction: 10 },
        })
    );

    useEffect(()=>{
        api({x:width-40,y:height-50});
    },[height,width]);
   
    return(
        <a.div 
            className="absolute"
            style={{x,y}}
        >
            <div
                {...ButtonToolTip}
                data-tooltip-content={"網程期末專案連結"}
            >
                <div className="text-3xl text-[#5F5F5F] hover:text-[#FFFFFF]">
                    <FontAwesomeIcon icon={faFilePdf} className="crossTabIcon" onClick={()=>{
                        window.open(PDFURL,'_blank');
                    }} />
                </div>
            </div>
        </a.div>
    )
}

export default LinkToPdf;