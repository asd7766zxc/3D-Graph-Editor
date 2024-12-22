import {Editor , loader} from '@monaco-editor/react';
import FloatWindow from './FloatWindow';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import TabButton from './TabButton'
import FileManager from '../Storage/FileManager';
import './font.css'

//remind: not to interact directly to global window state
function EditorWindow({
    currentFileState,
    defaultHotReload,
    iniX,iniY,iniW,iniH,
    onContent,fileState,
    windowState,filepath,
    icon,iconColor,title,
    handleValidation}){

    const [thisWindowState,setThisWindowState] = useRecoilState(windowState);

    const [thisFile,setThisFile] = useRecoilState(fileState);
    const [currentFile,setCurrentFile] = useRecoilState(currentFileState);
    const [currentUpdating,setCurrentUpdating] = useState(defaultHotReload);
    const file = thisFile[currentFile];

    const [fmOpen,setFmOpen]=useState("none");

    const editorRef = useRef(null);
    loader.init().then((monaco) => {
        monaco.editor.defineTheme('trueBlack', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#00000000',
            },
        });
    });
    
    const onEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const onEditorValueChange = (value,e) =>{
        setThisFile({...thisFile,
            [currentFile]:{
                value:value,
                name:file.name,
                language:file.language,
                open:true,
            }
        })
        if(currentUpdating != currentFile) return;
        onContent(value);
    }

    useEffect(()=>{
        let nxt = null;
        if(file && file.open) return;
        for(let tmp of Object.keys(thisFile)){
            if(thisFile[tmp] && thisFile[tmp].open) {
                nxt = tmp;
            }
        }
        if(nxt) setCurrentFile(thisFile[nxt].name);
    },[thisFile]);
    return(
        <>
        <FloatWindow
        iniY={iniY}
        iniX={iniX}
        iniW={iniW}
        iniH={iniH}
        icon={icon} 
        iconColor={iconColor} 
        title={title} 
        onClose={()=>{
            setThisWindowState(false);
        }}
        onAdd={()=>{
            setFmOpen(title);
        }}
        close={!thisWindowState}
        >
            <div className='glassPanel 
            h-[calc(100%-40px)]  
            border-[4px]  
            border-[#00000000] 
            shadow-[#1E1E1E_0px_0px_50px_0px] 
            rounded-md 
            overflow-hidden
            relative z-20' >
               <div className='h-[40px] content-center text-center text-wrap flex 
                whitespace-nowrap
                overflow-y-hidden 
                rounded-t-xl'>
                    {
                        Object.keys(thisFile).map((key)=>{
                            const x = thisFile[key];
                            if(!x.open) return(<></>);
                            return (<>
                                <TabButton
                                    filename={x.name} 
                                    OnHot={()=>{
                                        if(currentUpdating == x.name){
                                            setCurrentUpdating('');
                                            
                                        }else{
                                            setCurrentUpdating(x.name);
                                        }
                                    }}
                                    OnClick={()=>{
                                        setCurrentFile(x.name);
                                    }}
                                    OnPlay={()=>{
                                        setCurrentFile(x.name);
                                        onContent(thisFile[x.name].value);
                                    }}
                                    OnClose={()=>{
                                        setThisFile({...thisFile,
                                            [x.name]:{
                                                value:thisFile[x.name].value,
                                                name:thisFile[x.name].name,
                                                language:thisFile[x.name].language,
                                                open:false,
                                            }
                                        })
                                    }}
                                    focused={currentFile === x.name}
                                    hotupdate={currentUpdating === x.name }
                                />
                                <div className='h-[85%] w-[1px] bg-transparent mt-1'/>
                            </>
                            );  
                            }
                        )
                    }
                </div>
                { ((!currentFile) || (!file) || (!file.open)) &&
                    <div className="h-[calc(100%-41px)] w-full text-white
                     font-['DM Sans'] font-bold text-xl 
                     text-center
                     content-center">
                        Click '+' to open file
                    </div>
                }
                {(currentFile && file && file.open) &&
                <Editor className='h-[calc(100%-41px)] w-full' 
                        defaultLanguage={file.language?file.language:''} 
                        defaultValue={file.value}
                        path={(filepath?filepath:"")+file.name}
                        theme='trueBlack'
                        onChange={onEditorValueChange}
                        onMount={onEditorDidMount}
                        onValidate={handleValidation}
                        options={{
                            minimap: {
                            enabled: false,
                            },
                            fontSize: 18,
                        }}
                />}
            </div>
        </FloatWindow>
        <FileManager open={fmOpen} OnClose={()=>setFmOpen("none")} />
        </> 
    )
};
export default EditorWindow;
