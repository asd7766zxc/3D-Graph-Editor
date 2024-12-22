import { useEffect, useState } from "react";
import { fileLoadState, graphFiles, scriptFiles,rootPath, graphRoot, scriptRoot, ButtonToolTip} from "../WindowState";
import { useWindowDimensions } from "../../useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { useSpring, a, to } from '@react-spring/web'
import { createGraph, EdgeState, parseGraph, VertexState } from "../../AbstractGraph";

let loaddd = false;
let internalGraphVariable = {};
let internalScriptVariable = {};
function StorageState(){
    const { height, width } = useWindowDimensions();
    const [graphFile,setGraphFile] = useRecoilState(graphFiles);
    const [scriptFile,setScriptFile] = useRecoilState(scriptFiles);
    const [fileLoaded,setFileLoaded] = useRecoilState(fileLoadState);

    const [drawnVertices,setDrawnVertices] = useRecoilState(VertexState);
    const [drawnEdges,setDrawnEdges] = useRecoilState(EdgeState);

    const [internalGraph,setInternalGraph] = useState({});
    const [internalScript,setInternalScript] = useState({});

    const [saved,SetSaved] = useState(true);
    
    const loadGraph = (value) =>{
        const [_verts,_edges] = createGraph(parseGraph(value));
        setDrawnVertices(_verts);
        setDrawnEdges(_edges);
    };
    const [{ x, y}, api] = useSpring(
        () => ({
          x: window.innerWidth-40,
          y: 10,
          config: { friction: 10 },
        })
    );
    useEffect(()=>{
        if(!(loaddd || fileLoaded)) return;
        const timer = window.setInterval(()=>{
            let curState = {
                [graphRoot]:{
                    ...internalGraphVariable
                },
                [scriptRoot]:{
                    ...internalScriptVariable
                }
            };
            console.log(curState);
            localStorage.setItem(rootPath,JSON.stringify(curState));
            SetSaved(true);
        },5000);
    },[]);
    useEffect(()=>{
        if(fileLoaded || loaddd) return;
        setFileLoaded(true);
        loaddd = true;

        console.log("Auto Save ON, will saving every 5sec");
        let storageString = localStorage.getItem(rootPath);
        if(!storageString) return;
        const storage = JSON.parse(storageString);
        if(!storage) return;

        setGraphFile(storage[graphRoot]);
        setScriptFile(storage[scriptRoot]);

        setInternalGraph(storage[graphRoot]);
        setInternalScript(storage[scriptRoot]);

        internalGraphVariable = storage[graphRoot];
        internalScriptVariable = storage[scriptRoot];

        const kyes = Object.keys(storage[graphRoot]);
        if(kyes.length >= 1){
            loadGraph(storage[graphRoot][kyes[0]].value);
        }
        console.log("Status Loaded!!");
    },[]);

    useEffect(()=>{
        api({x:width-40,y:10});
    },[height,width]);

    useEffect(()=>{
        setInternalGraph(graphFile);
        internalGraphVariable = graphFile;
        SetSaved(false);
    },[graphFile]);

    useEffect(()=>{
        setInternalScript(scriptFile);
        internalScriptVariable = scriptFile;
        SetSaved(false);
    },[scriptFile]);

    return(
        <a.div 
            className="absolute"
            style={{x,y}}
        >
            <div
                {...ButtonToolTip}
                data-tooltip-content={saved ? "Files Saved" : "Unsaved"}
            >
                <div className="text-3xl">
                    <FontAwesomeIcon icon={faFloppyDisk} style={{
                        color: saved ? "#5F5F5F" : "white"
                    }} />
                </div>
            </div>
        </a.div>
    )
}

export default StorageState;