import React, { useRef, useEffect } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'

import EditorWindow from './component/Floating/EditorWindow';
import Playground from './component/Playground';
// import Playground from './component/Playground'

library.add(faCircleNodes)

function App() {
    return (
        <div>
            <Playground />
            <EditorWindow />
        </div>
    );
}
export default App;
