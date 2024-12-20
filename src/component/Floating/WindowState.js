import { atom } from 'recoil';

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

const graphFiles = atom({
    key:'graphFiles',
    default:{
        'default': {
            name: 'default',
            language: '',
            value: '0\n1\n2\n3\n4\n5\n0 2\n0 4\n0 5\n1 4\n1 5\n2 3\n2 4\n4 5',
        },
        'style': {
            name: 'style',
            language: '',
            value: 'y2',
        },
        'index': {
            name: 'index',
            language: '',
            value: 'y3',
        },
    }
});

const scriptFiles = atom({
    key:'scriptFiles',
    default:{
        'default': {
            name: 'default',
            language: 'javascript',
            value: '0\n1\n2\n3\n4\n5\n0 2\n0 4\n0 5\n1 4\n1 5\n2 3\n2 4\n4 5',
        },
        'style.js': {
            name: 'style.js',
            language: 'javascript',
            value: 'y2',
        },
        'index.js': {
            name: 'index.js',
            language: 'javascript',
            value: 'y3',
        },
    }
});

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
};