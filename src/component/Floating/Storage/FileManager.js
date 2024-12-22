import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme, Dialog, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect,useState } from "react";
import { ButtonToolTip, graphDataWindowState, graphDataWindowStyle, graphFiles, graphFileState, scriptFiles, scriptFileState, scriptWindowState, scriptWindowStyle } from "../WindowState";
import { useRecoilState } from "recoil";
import FileTabButton from "./FileTabButton";

function FileManager({open,OnClose,...props}){
    const [graphFile,setGraphFile] = useRecoilState(graphFiles);
    const [scriptFile,setScriptFile] = useRecoilState(scriptFiles);

    const [graphSelect,setGraphSelect] = useRecoilState(graphFileState);
    const [scriptSelect,setScriptSelect] = useRecoilState(scriptFileState);

    const [graphDataWindowStates,setGraphDataWindowStates] = useRecoilState(graphDataWindowState);
    const [scriptWindow,setScriptWindow] = useRecoilState(scriptWindowState);

    const [searchString,setSearchString] = useState('');
    const [fileExists,setFileExists] = useState(false);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    return (
        <Dialog
            open={open !== "none"}
            onClose={OnClose}
            PaperProps={{
                style: {
                  backgroundColor: '#1e1e1e',
                },
              }}
        >
            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                <div className="flex">
                    <div {...ButtonToolTip} data-tooltip-content="Close" >
                        <FontAwesomeIcon className='ml-3 mt-3 crossTabIcon 
                        text-[#555555] hover:text-[#FFFFFF]' 
                        icon={faXmark} 
                        onClick={OnClose}/>
                    </div>
                    <div className="relative 
                    w-full mt-4 content-center text-center
                    ">
                        <ThemeProvider theme={darkTheme}>

                            <TextField 
                            label="Enter to add file"
                            variant="filled"
                            error={fileExists}
                            // className="bg-"
                            helperText={fileExists ? "cannot add file, file already exists" : ""}
                            sx={{ 
                                label : { color:"#AFAFAF"},
                                input : { color :"white"},
                            }}
                            value={searchString}
                            onChange={(e)=>{
                                setSearchString(e.target.value);
                            }}
                            onKeyDown={(e)=>{
                                setFileExists(false);
                                if(e.key == "Enter"){
                                    if(open === "Graph Data"){
                                        if(searchString in graphFile){
                                            setFileExists(true);
                                            return;
                                        }
                                        setGraphFile({...graphFile,
                                            [searchString]:{
                                                value:"",
                                                name:searchString,
                                                language:"",
                                                open:true,
                                            }
                                        })
                                        setGraphDataWindowStates(true);
                                        setGraphSelect(searchString);
                                        OnClose();
                                    }
                                    if(open === "Scripts"){
                                        if(searchString in scriptFile){
                                            setFileExists(true);
                                            return;
                                        }
                                        setScriptFile({...scriptFile,
                                            [searchString]:{
                                                value:"",
                                                name:searchString,
                                                language:"javascript",
                                                open:true,
                                            }
                                        })
                                        setScriptWindow(true);
                                        setScriptSelect(searchString);
                                        OnClose();
                                    }
                                }
                            }}
                            autoFocus="true"
                            className="w-[90%]"
                            />
                            
                        </ThemeProvider>
                        
                    </div>
                </div>
                <div className="bg-[#1e1e1e] no-scrollbar overflow-y-auto m-4">
                        {
                            Object.keys(graphFile).map((key)=>{
                                const file = graphFile[key];
                                let fileName = file.name;
                                if(!(fileName.toLowerCase().includes(searchString.toLowerCase()))) {
                                    return (<></>);
                                }
                                return(
                                    <FileTabButton 
                                    {...graphDataWindowStyle} 
                                    highlight={searchString} 
                                    fileName={file.name}
                                    OnClick={()=>{
                                        setGraphFile({...graphFile,
                                            [file.name]:{
                                                value:graphFile[file.name].value,
                                                name:graphFile[file.name].name,
                                                language:graphFile[file.name].language,
                                                open:true,
                                            }
                                        })
                                        setGraphDataWindowStates(true);
                                        setGraphSelect(file.name);
                                        OnClose();
                                       
                                    }}
                                    OnDelete={()=>{
                                        let graphState = {...graphFile};
                                        delete graphState[key];
                                        setGraphFile(graphState);
                                    }} />
                                )
                            })
                        }
                        {
                            Object.keys(scriptFile).map((key)=>{
                                const file = scriptFile[key];
                                let fileName = file.name;
                                if(!(fileName.toLowerCase().includes(searchString.toLowerCase()))) {
                                    return (<></>);
                                }
                                return(
                                    <FileTabButton 
                                    {...scriptWindowStyle} 
                                    highlight={searchString} 
                                    fileName={file.name}
                                    OnClick={()=>{
                                        setScriptFile({...scriptFile,
                                            [file.name]:{
                                                value:scriptFile[file.name].value,
                                                name:scriptFile[file.name].name,
                                                language:scriptFile[file.name].language,
                                                open:true,
                                            }
                                        })
                                        setScriptWindow(true);
                                        setScriptSelect(file.name);
                                        OnClose();
                                    }}
                                    OnDelete={()=>{
                                        let scripState = {...scriptFile};
                                        delete scripState[key];
                                        setScriptFile(scripState);
                                    }} />
                                )
                            })
                        }
                </div>
            </div>
        </Dialog>
    );
}

export default FileManager;
