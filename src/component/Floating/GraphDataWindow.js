import {Editor , loader} from '@monaco-editor/react';
import FloatWindow from './FloatWindow';
import { useRef } from 'react';
import { VertexState,EdgeState,defaultGraphString,parseGraph, createGraph } from '../AbstractGraph'
import { useRecoilState } from 'recoil';

function GraphDataWindow({children}){

    const [drawnVertices,setDrawnVertices] = useRecoilState(VertexState);
    const [drawnEdges,setDrawnEdges] = useRecoilState(EdgeState);

    const editorRef = useRef(null);
    loader.init().then((monaco) => {
        monaco.editor.defineTheme('trueBlack', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#000000',
            },
        });
    });
    const onEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }
    const onEditorValueChange = (value,e) =>{
        const [_verts,_edges] = createGraph(parseGraph(value));
        setDrawnVertices(_verts);
        setDrawnEdges(_edges);
    }
    return(
        <FloatWindow icon={"fa-circle-nodes"} iconColor={"#22c55e"} title={"Graph Data"}>
            <div className='h-[calc(100%-40px)]  border-[4px] bg-[#000000] border-[#000000] shadow-[#1E1E1E_0px_0px_50px_0px] rounded-md relative z-20' >
                <Editor className='h-full w-full' 
                defaultLanguage="" 
                defaultValue={defaultGraphString}
                theme='trueBlack'
                onChange={onEditorValueChange}
                onMount={onEditorDidMount}
                options={{
                    minimap: {
                      enabled: false,
                    },
                    fontSize: 18,
                    wordWrap: "on",
                  }}
                />
            </div>
        </FloatWindow>
    )
};
export default GraphDataWindow;
