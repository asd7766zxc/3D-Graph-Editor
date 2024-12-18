import {Editor} from '@monaco-editor/react';
import FloatWindow from './FloatWindow';
function EditorWindow({children}){

    return(
        <FloatWindow>
            <div className='h-[calc(100%-40px)] border-[4px] bg-[#1E1E1E] border-[#1E1E1E] shadow-[#1E1E1E_0px_0px_50px_0px] rounded-md relative z-20' >
                <Editor className='h-full w-full' 
                defaultLanguage="javascript" 
                defaultValue="// Life sucks, but shit is going real : )"
                options={{
                    minimap: {
                      enabled: false,
                    },
                    fontSize: 18,
                    wordWrap: "on",
                  }}
                theme='vs-dark' />
            </div>
        </FloatWindow>
    )
};
export default EditorWindow;
