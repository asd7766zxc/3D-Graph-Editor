import { atom } from 'recoil';
import { exampleScriptString } from '../../defaultData/default';
const windowState = atom({
    key:'windowState',
    default:[],
});

const graphDataWindowState = atom({
    key:'graphDataWindowState',
    default:true,
});

const graphDataWindowStyle = {
    icon:"fa-circle-nodes",
    iconColor:"#22c55e",
    title:"Graph Data",
    iniX:40,
    iniY:40,
    iniW:400,
    iniH:400,
};

const scriptWindowState = atom({
    key:'scriptWindowState',
    default:false,
});

const scriptWindowStyle = {
    icon:"fa-code",
    iconColor:"#2196F3",
    title:"Scripts",
    iniX:40,
    iniY:400,
    iniW:400,
    iniH:400,
};


const windowTop = atom({
    key:'windowTop',
    default:10,
});


const sidebarPosState = atom({
    key:'sidebarPosState',
    default:[0,0],
});

const graphPath = "graph/";
const graphRoot = "graph";
const graphFileState = atom({
    key:'graphFileState',
    default:"default",
});
const graphFiles = atom({
    key:'graphFiles',
    default:{
        'default': {
            name: 'default',
            language: '',
            value: '0\n1\n2\n3\n4\n5\n0 2\n0 4\n0 5\n1 4\n1 5\n2 3\n2 4\n4 5',
            open:true,
        },
        'tree': {
            name: 'tree',
            language: '',
            value: '1 0',
            open:false,
        },
        'cycle': {
            name: 'cycle',
            language: '',
            value: '1 0',
            open:false,
        },
    }
});

const scriptPath = "script/";
const scriptRoot = "script";
const scriptFileState = atom({
    key:'scriptFileState',
    default:"example.js",
});
const scriptFiles = atom({
    key:'scriptFiles',
    default:{
        'example.js': {
            name: 'example.js',
            language: 'javascript',
            value: exampleScriptString,
            open:true,
        },
        'empty.js': {
            name: 'empty.js',
            language: 'javascript',
            value: '',
            open:false,
        },
    }
});

const fileLoadState = atom({
    key:'fileLoadState',
    default:false,
});
const rootPath = "tdViewState";
const ButtonToolTip = {
    'data-tooltip-id':"tooltip-common",
    'data-tooltip-delay-show':500,
};

export {
    windowState,
    windowTop,
    graphDataWindowState,
    scriptWindowState,
    sidebarPosState,
    graphFiles,
    scriptFiles,
    graphDataWindowStyle,
    scriptWindowStyle,
    ButtonToolTip,
    graphPath,
    scriptPath,
    rootPath,
    graphFileState,
    scriptFileState,
    fileLoadState,
    graphRoot,
    scriptRoot,
};