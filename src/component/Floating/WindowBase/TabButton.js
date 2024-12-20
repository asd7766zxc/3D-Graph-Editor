import { faRotate, faXmark,faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function TabButton({focused,OnClick,OnPlay,OnHot,filename,hotupdate,OnClose}){
    const [focus,setFocus] = useState(focused);
    const [updating,setUpdating] = useState(hotupdate);

    useEffect(()=>{
        setFocus(focused);
    },[focused]);

    useEffect(()=>{
        setUpdating(hotupdate);
    },[hotupdate]);

    return(
        <div onClick={OnClick} 
            className="flex content-center text-center "
            style={{backgroundColor:focus? "rgba(0,0,0,0)":"rgba(1,1,1,0.4)",
                    borderTop:focus?"2px solid #7a97ff" :"2px solid rgba(0,0,0,0)",
            }}>
                <div className="mt-[5px] ml-3 text-lg crossTabIcon"
                    onClick={OnPlay}
                    onDoubleClick={OnHot}>
                    <FontAwesomeIcon icon={updating? faRotate:faPlay} style={{color:updating?"#FFEB3B":"#7a97ff"}}
                    className={updating ? "animate-spin":""} />
                </div>
            <div className="
            ml-2
            mr-[10px]
            mt-[8px]
            text-[#969690] font-['DM Sans']
            text-base
            font-medium
            select-none">
                {filename}
            </div>
            <div className='text-2xl text-[#e4e4dd] mr-[10px] mt-[3px] select-none'
            >
                <FontAwesomeIcon className='crossTabIcon' icon={faXmark} onClick={OnClose} />
            </div>
        </div>
    );
}
export default TabButton;