import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../WindowBase/font.css'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../AbstractGraph";

function FileTabButton({icon,iconColor,fileName,OnClick,highlight,OnDelete,...props}){
    const getHighlightedText = () => {
        if(!highlight || isEmptyOrSpaces(highlight)) return fileName;
        // Split on highlight term and include term into parts, ignore case
        const parts = fileName.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { 
                fontWeight: 'bold',
                color:"#2962FF"
                 } : {} }>
                { part }
            </span>)
        } </span>;
    }
    return(
        <div className="flex mt-1 justify-between hover:bg-slate-700">
            <div className="flex hover:cursor-pointer mr-80" onClick={OnClick}>
                <div className='h-full text-center text-base ml-2 mr-1 content-center'>
                    <FontAwesomeIcon icon={icon} style={{color:iconColor}} />
                </div>
                <div className=" 
                        w-full text-[#AFAFAF]
                        font-['DM Sans'] 
                        font-normal 
                        text-base 
                        select-none
                        content-center">
                            {getHighlightedText()}
                </div>
            </div>
                <div className='h-full float-right text-center text-base text-[#555555] hover:text-[#FFFFFF] ml-2 mr-2 content-center'>
                    <FontAwesomeIcon icon={faTrash} className="crossTabIcon" onClick={OnDelete} />
                </div>
        </div>
    );
    
};

export default FileTabButton;