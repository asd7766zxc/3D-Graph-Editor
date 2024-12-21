import { VertexState,EdgeState,instanceGraph, createGraph, parseGraph } from '../AbstractGraph'
import { useRecoilState } from 'recoil';
import { scriptFiles,scriptPath,scriptWindowState,scriptWindowStyle } from './WindowState';
import EditorWindow from './WindowBase/EditorWindow';
import { useState } from 'react';

function ScriptWindow(){

    const [drawnVertices,setDrawnVertices] = useRecoilState(VertexState);
    const [drawnEdges,setDrawnEdges] = useRecoilState(EdgeState);
    const [containError,setContainError] = useState(false);
    function isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
          return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
      }

    //Basic error check
    const handleValueChange = (value) => {
        if(containError) return;
        // check return value iterable
        let ret;
        try{
            let _func = new Function(value);
            ret = (_func());
        }catch(e){
            console.log(e);
            return;
        }
        try{
            if(!isIterable(ret) || ret.length < 2) return;
            const [_verts,_edges] = ret;
            if(!isIterable(_verts) || !isIterable(_edges)) return;
            const [__verts,__edges] = instanceGraph([_verts,_edges]);
            setDrawnVertices(__verts);
            setDrawnEdges(__edges);
        }catch(e){
            console.log(e);
        }
    };

    const handleValidation = (markers)=>{
        let chk = false;
        markers.forEach((marker)=>{
            console.log(marker);
            if(marker.severity >= 8){
                setContainError(true);
                chk = true;
                return;
            }
        });
        if(chk) return;
        setContainError(false);
    }
    return(
        <EditorWindow
            onContent={handleValueChange}
            fileState={scriptFiles}
            windowState={scriptWindowState}
            defaultFileName={'example.js'}
            defaultHotReload={''}
            filepath={scriptPath}
            handleValidation={handleValidation}
           {...scriptWindowStyle}
        />
    )
};
export default ScriptWindow;
