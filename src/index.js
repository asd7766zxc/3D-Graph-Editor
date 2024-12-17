import { createRoot } from 'react-dom/client'
import React from 'react'
import Split from 'react-split'
import './index.css';
import './styles.css';
import Playground from './component/Playground'

{/*// <div>

    // <Split class="wrap"
    // sizes={[25, 75]}
    // minSize={100}
    // expandToMin={false}
    // gutterSize={10}
    // gutterAlign="center"
    // snapOffset={30}
    // dragInterval={1}
    // direction="horizontal"
    // cursor="col-resize">
    //     <Playground />
    //     <Playground />
    // </Split>
    // <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 h-4">

    // </button>
    // </div>*/}

createRoot(document.getElementById('root')).render(
      <Playground />
)
