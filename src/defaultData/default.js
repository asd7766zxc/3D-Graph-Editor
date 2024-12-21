const exampleScriptString = "\r\n\/*\r\n    Reminders:\r\n        1. when using hot updating plz check there is no scripting bug ( debugger WIP )\r\n           otherwise your console will be a mess :(\r\n        2. if vertex styling not provided the follow default styling will apply\r\n        3. if there is any bug, you can report on github issue or DM me on discord (info on up right corner)\r\n        4. down below is example for all possible scripting usage \r\n*\/\r\nconst graphDefaultStyle = {\r\n    text:\"\",\r\n    scaling:0.04,\r\n    ringColor:0xff0000,\r\n    bgColor:0x000000,\r\n    radiusInner:4.5,\r\n    radiusOuter:5,\r\n    cirlceStep:1000,\r\n    ringHover:0xffffff,\r\n    bgHover:0xffffff,\r\n    fontSize:4,\r\n    bgOpacity:0,\r\n};\r\n\/* \r\n    let Vertex = {\r\n        id:1,        \/\/unique id (1-base)\r\n        pos:[0,0,0], \/\/3d pos [x,y,z] (y is perpendicular to grid)\r\n        style:graphDefaultStyle,\r\n    };\r\n    Note : connect edge by indicating vertex ids\r\n*\/\r\nlet _edges = []; \/\/edge must be a 2d array \r\nlet _verts = [];\r\nfor(let i = 1; i <= 10; ++i){\r\n    let r = 1;\r\n    let theta = 2*Math.PI*i \/ 10;\r\n    const style = {...graphDefaultStyle};\r\n    let cpos = [r * Math.cos(theta),0,r * Math.sin(theta)]; \/\/ draw circle \r\n    style.text = i.toString();\r\n\r\n    let Vertex = {\r\n        id:i,        \r\n        pos:cpos, \r\n        style:style,\r\n        params:{\r\n            t : i,\r\n        }\r\n    };\r\n\r\n    \/\/trriger on rendering phase every tick!\r\n    Vertex.requestAnimation = (elapsed,params,state,delta,setPos,setStyle,styling) => {\r\n        \/\/ !!! important !!!\r\n        \/\/ variable cannot be passed to this animation scope\r\n        \/\/ use params instead\r\n        cpos[1] = Math.cos(params.t + elapsed\/1000);\r\n        const sty = {...styling};\r\n        sty.ringColor = (sty.ringColor + 1 ) % 0xffffff; \/\/color cycle\r\n        sty.text = (Math.round((sty.ringColor + 1)\/10)%10).toString(); \/\/change text\r\n        setStyle(sty);\r\n        setPos(cpos);\r\n    };\r\n    _verts.push(Vertex);\r\n    _edges.push([i,i%10 + 1]); \/\/edge: a pair of vertex\'s id\r\n}\r\nreturn [_verts,_edges];\r\n";

export {exampleScriptString};