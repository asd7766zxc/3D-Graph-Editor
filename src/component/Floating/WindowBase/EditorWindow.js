import {Editor , loader} from '@monaco-editor/react';
import FloatWindow from './FloatWindow';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import TabButton from './TabButton'
import FileManager from './FileManager';
//remind: not to interact directly to global window state
function EditorWindow({defaultFileName,
    defaultHotReload,
    iniX,iniY,iniW,iniH,
    onContent,fileState,
    windowState,filepath,
    icon,iconColor,title,
    handleValidation}){

    const [thisWindowState,setThisWindowState] = useRecoilState(windowState);

    const [thisFile,setThisFile] = useRecoilState(fileState);
    const [currentFile,setCurrentFile] = useState(defaultFileName);
    const [currentUpdating,setCurrentUpdating] = useState(defaultHotReload);
    const file = thisFile[currentFile];
    const [fmOpen,setFmOpen]=useState(false);

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
            }
        })
        if(currentUpdating != currentFile) return;
        onContent(value);
    }
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
            setFmOpen(true);
        }}
        close={!thisWindowState}
        >
            <div className='glassPanel 
            h-[calc(100%-40px)]  
            border-[4px]  
            border-[#00000000] 
            shadow-[#1E1E1E_0px_0px_50px_0px] 
            rounded-md 
            relative z-20' >
               <div className='h-[40px] content-center text-center text-wrap flex overflow-hidden rounded-t-xl'>
                    {
                        Object.keys(thisFile).map((key)=>{
                            const x = thisFile[key];
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
                <Editor className='h-[calc(100%-41px)] w-full' 
                defaultLanguage={file.language} 
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
                /> 
            </div>
        </FloatWindow>
        <FileManager open={fmOpen} OnClose={()=>setFmOpen(false)} />
        </> 
    )
};
export default EditorWindow;
