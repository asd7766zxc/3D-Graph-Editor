import React, { useRef, useEffect, useLayoutEffect } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNodes, faCode, faPaintBrush, faPalette, faPen } from '@fortawesome/free-solid-svg-icons'

import GraphDataWindow from './component/Floating/GraphDataWindow';
import ScriptWindow from './component/Floating/ScriptWindow';
import Playground from './component/Playground';
import { useRecoilState } from 'recoil';
import { windowState } from './component/Floating/WindowState'
import Sidebar from './component/Floating/SidebarPart/Sidebar'
import SelectorWindow from './component/Floating/WindowBase/SelectorWindow';
import { Tooltip } from 'react-tooltip';
import StorageState from './component/Floating/Storage/StorageState';

library.add(faCircleNodes,faCode,faPen,faPaintBrush,faPalette)

let added = false;
function App() {
    const [windowStates,setWindowStates] = useRecoilState(windowState);
    useEffect(()=>{
        if(added) return;
        added = true;
        setWindowStates([
            <GraphDataWindow />,
            <ScriptWindow />,
        ]);    
    });
    return (
        <div>
            <Tooltip id='tooltip-common' className='relative z-50' />
            <Playground />
            {[...windowStates]}
            <Sidebar />
            <SelectorWindow />
            <StorageState />
        </div>
    );
}
export default App;
