import React, { useRef, useEffect } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'

import GraphDataWindow from './component/Floating/GraphDataWindow';
import Playground from './component/Playground';

library.add(faCircleNodes)

function App() {
    return (
        <div>
            <Playground />
            <GraphDataWindow />
        </div>
    );
}
export default App;
