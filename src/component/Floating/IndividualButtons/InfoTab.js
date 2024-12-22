import { faCircleInfo, faDownLeftAndUpRightToCenter, faFilePdf, faFloppyDisk, faPlay, faPlus, faRotate, faRotateRight, faTableCellsLarge, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, a, to } from '@react-spring/web'
import { useEffect, useState } from 'react';
import { useWindowDimensions } from '../../useWindowDimensions';
import { ButtonToolTip } from '../WindowState';
import { createTheme, Dialog, TextField, ThemeProvider } from "@mui/material";
import React from 'react';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
function TrashButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faTrash} style={{color:"#00897B"}} />
        </span>
    );
}
function AddButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faPlus} style={{color:"#00897B"}} />
        </span>
    );
}
function MinimizeButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} style={{color:"#00897B"}} />
        </span>
    );
}
function SaveButton({saved}){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faFloppyDisk} style={{
                                color: saved ? "#5F5F5F" : "white"
                            }} />
        </span>
    );
}
function GridButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faTableCellsLarge} style={{color:"#00897B"}} />
        </span>
    );
}
function CameraButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faRotateRight} style={{color:"#00897B"}} />
        </span>
    );
}
function GraphButton(){
    return(
        <span className='text-center text-xl content-center'>
        <FontAwesomeIcon icon={faConnectdevelop} style={{color:"#00897B"}} />
        </span>
    );
}
function LoadButton({updating}){
    return(
        <span className="text-center text-xl content-center"
            data-tooltip-content={updating ? "Hot Reloading":"Play"}
            >
            <FontAwesomeIcon icon={updating? faRotate:faPlay} style={{color:updating?"#FFEB3B":"#7a97ff"}}
            className={updating ? "animate-spin":""} 
            />
        </span>
    );
};
function GraphIcon(){
    return(
        <span className='text-center text-xl content-center'>
            <FontAwesomeIcon icon={"fa-circle-nodes"} style={{color:"#22c55e"}} />
        </span>
    );
};
function ScriptIcon(){
    return(
        <span className='text-center text-xl content-center'>
            <FontAwesomeIcon icon={"fa-code"} style={{color:"#2196F3"}} />
        </span>
    );
};
function InfoTab(){
    const { height, width } = useWindowDimensions();
    const [{ x, y}, api] = useSpring(
        () => ({
          x: window.innerWidth-120,
          y: window.innerHeight-50,
          config: { friction: 10 },
        })
    );
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        api({x:width-120,y:height-50});
    },[height,width]);
    
    const handleClose = () =>{
        setOpen(false);
    };
    return(
        <>
            <a.div 
                className="absolute"
                style={{x,y}}
            >
                <div
                    {...ButtonToolTip}
                    data-tooltip-content={"Info"}
                >
                    <div className="text-3xl text-[#5F5F5F] hover:text-[#FFFFFF]">
                        <FontAwesomeIcon icon={faCircleInfo} className="crossTabIcon" onClick={()=>{
                            setOpen(true);
                        }} />
                    </div>
                </div>
            </a.div>
            <ThemeProvider theme={darkTheme}>
                <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                backgroundColor: '#1e1e1e',
                                },
                            }}
                            
                >
                    <div className='flex ml-10 mr-10 overflow-y-auto overflow-x-hidden thinScroll flex-col mb-10'>
                        <div className="text-3xl ml-1 mt-4 font-['DM Sans'] font-bold">
                            How to use?
                        </div>
                        <br />
                        
                        <div className="text-xl ml-4 font-['DM Sans'] font-bold">
                            Playground & Graph Interaction
                        </div>
                        <br />
                        <div className="text-base font-['DM Sans'] ml-10 font-normal text-[#BFBFBF] mr-10">
                            Use mouse-left to drag empty area to spin perspective.
                            <br />
                            Use mouse-right to drag empty area to move around.
                            <br />
                            Drag vertex (with pointer) will literally drag the vertex around.
                            <br />
                        </div>
                        <br />
                        <div className="text-xl ml-4 font-['DM Sans'] font-bold">
                            Sidebar (draggable)
                        </div>
                        <br />
                        <div className="text-base font-['DM Sans'] ml-10 font-normal text-[#BFBFBF] mr-10">
                            Click <GraphIcon /> <ScriptIcon /> to toggle the window visiabiliy.
                            <br /> 
                            <GridButton /> : toggle the grid visiabiliy.
                            <br /> 
                            <CameraButton /> : if on, any data update that re-render the view will spin the camera to original position.
                            <br /> 
                            <GraphButton /> : toggle the graph's "spring-joint like" behavior.
                        </div>
                        <br />
                        <div className="text-xl ml-4 font-['DM Sans'] font-bold">
                            Editors & Window (draggable)
                        </div>
                        <br />
                        <div className="text-base font-['DM Sans'] ml-10 font-normal text-[#BFBFBF] mr-10">
                            You can edit the data/script in the text field with standard vscode editor,
                            and click <LoadButton /> to load data/script into view.
                            <br />
                            Double click <LoadButton /> will turn on the hot reloading mode <LoadButton updating={true} />.
                            <br />
                            The <LoadButton updating={true} /> file, will load data/script into view every you edit it.
                            <br />
                            Note : you can have only one hot reloading file per window.
                            <br />
                            To manage fille, close the tab on editor window will hide the file and click the <AddButton /> will show the file manager.
                        </div>
                        <br />
                        <div className="text-xl ml-4 font-['DM Sans'] font-bold">
                            File Management 
                        </div>
                        <br />
                        <div className="text-base font-['DM Sans'] ml-10 font-normal text-[#BFBFBF] mr-10">
                            Once you click the <AddButton />, the file manager should be shown, and autofocused to searchbar.
                            <br />
                            Use search bar to search and enter to add file (if file is not exists).
                            <br />
                            The search result can be clicked and it will pop up on the editor windows.
                            <br />
                            Click <TrashButton /> to delete files (no redo).
                            <br />
                            <SaveButton saved={false} /> in the top right corner indicates the file state. (auto save works every five second).
                            <br />
                            <SaveButton saved={true} /> means current state saved, <SaveButton /> otherwise.
                            <br />
                            Note : if you need default data/script back you can manually delete the localStorage with key "tdViewState".
                        </div>
                        <br />
                        <div className="text-xl ml-4 font-['DM Sans'] font-bold">
                            Scripting 
                        </div>
                        <br />
                        <div className="text-base font-['DM Sans'] ml-10 font-normal text-[#BFBFBF] mr-10">
                           In <ScriptIcon /> window you can create your own script to generate graph or create graph animation.
                           <br/>
                           See example.js in <ScriptIcon /> window for more informations.
                           <br/>
                           Note : it is prefer to turn off the <CameraButton />  while scripting with animation, 
                           otherwise it will lock your camera.
                        </div>
                    </div>
                </Dialog>

            </ThemeProvider>
        </>
    )
}

export default InfoTab;
