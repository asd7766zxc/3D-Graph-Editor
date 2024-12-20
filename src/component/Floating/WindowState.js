import { atom } from 'recoil';

const windowState = atom({
    key:'windowState',
    default:[],
});

const graphDataWindowState = atom({
    key:'graphDataWindowState',
    default:true,
});

const scriptingWindowState = atom({
    key:'scriptingWindowState',
    default:true,
});

const stylingWindowState = atom({
    key:'stylingWindowState',
    default:true,
});

const windowTop = atom({
    key:'windowTop',
    default:10,
});


export {
    windowState,
    windowTop,
    graphDataWindowState
};