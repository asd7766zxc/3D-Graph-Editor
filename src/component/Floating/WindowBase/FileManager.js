import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import { useEffect,useState } from "react";
import { ButtonToolTip } from "../WindowState";

function FileManager({open,OnClose,...props}){
    return (
        <Dialog
            open={open}
            onClose={OnClose}
        >
            <div className="bg-[#1e1e1e]">
                    <div {...ButtonToolTip} data-tooltip-content="Close" >
                        <FontAwesomeIcon className='ml-3 mr-3 mt-1.5 crossTabIcon 
                        text-[#555555] hover:text-[#FFFFFF]' 
                        icon={faXmark} 
                        onClick={OnClose}/>
                    </div>
            </div>
        </Dialog>
    );
}

export default FileManager;