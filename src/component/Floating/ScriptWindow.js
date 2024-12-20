import { VertexState,EdgeState,parseGraph, createGraph } from '../AbstractGraph'
import { useRecoilState } from 'recoil';
import { scriptFiles,scriptWindowState,scriptWindowStyle } from './WindowState';
import EditorWindow from './WindowBase/EditorWindow';

function ScriptWindow(){

    const handleValueChange = (value) => {
        console.log(value);
    };

    return(
        <EditorWindow
            onContent={handleValueChange}
            fileState={scriptFiles}
            windowState={scriptWindowState}
            defaultFileName={'default'}
            defaultHotReload={''}
           {...scriptWindowStyle}
        />
    )
};
export default ScriptWindow;
