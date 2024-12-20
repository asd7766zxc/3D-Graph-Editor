import React, { useRef, useEffect, useLayoutEffect } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNodes, faCode, faPaintBrush, faPalette, faPen } from '@fortawesome/free-solid-svg-icons'

import GraphDataWindow from './component/Floating/GraphDataWindow';
import Playground from './component/Playground';
import { useRecoilState } from 'recoil';
import { windowState } from './component/Floating/WindowState'
import Sidebar from './component/Floating/Sidebar'
library.add(faCircleNodes,faCode,faPen,faPaintBrush,faPalette)

let added = false;
function App() {
    const [windowStates,setWindowStates] = useRecoilState(windowState);
    useEffect(()=>{
        if(added) return;
        added = true;
        setWindowStates([
            <GraphDataWindow />,
        ]);    
    });
    return (
        <div>
            <Playground />
            {[...windowStates]}
            <Sidebar />
        </div>
    );
}
export default App;
