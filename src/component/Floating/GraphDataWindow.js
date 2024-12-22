import { VertexState,EdgeState,parseGraph, createGraph } from '../AbstractGraph'
import { useRecoilState } from 'recoil';
import { graphDataWindowState, graphFiles,graphDataWindowStyle, graphPath, graphFileState } from './WindowState';
import EditorWindow from './WindowBase/EditorWindow';

function GraphDataWindow(){

    const [drawnVertices,setDrawnVertices] = useRecoilState(VertexState);
    const [drawnEdges,setDrawnEdges] = useRecoilState(EdgeState);

    const handleValueChange = (value) => {
        const [_verts,_edges] = createGraph(parseGraph(value));
        setDrawnVertices(_verts);
        setDrawnEdges(_edges);
    };

    return(
        <EditorWindow
            onContent={handleValueChange}
            fileState={graphFiles}
            windowState={graphDataWindowState}
            currentFileState={graphFileState}
            defaultHotReload={'default'}
            filepath={graphPath}
            {...graphDataWindowStyle}
        />
    )
};
export default GraphDataWindow;
