import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WindowButton.css'
import { useEffect, useState } from 'react';
function WindowButton({icon,iconColor,onClick,...props}){
    const [active,setActive] = useState(props.btnState);
    useEffect(()=>{
        setActive(props.btnState);
    },[props.btnState]);
    return (
        <div className='windowbtn h-[36px] w-[36px] rounded'>
            <div className='h-[36px] w-[36px] rounded content-center text-center text-2xl'
                style={{backgroundColor:active?
                    'rgba(255, 255, 255, 0.06)':'rgba(255, 255, 255, 0.00)'}}
                onClick={onClick}>
                <FontAwesomeIcon icon={icon} style={{color:iconColor}} />
            </div>
        </div>
    );
};
export default WindowButton;