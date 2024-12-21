import { useEffect,useState } from "react";

function FileManager({X,Y,...props}){
    const [x,setPosX] = useState(X);
    const [y,setPosY] = useState(Y);

    useEffect(()=>{
        setPosX(X);
        setPosY(Y);
        console.log(x,y);
    }
    ,[X,Y]);

    return (
        <div style={{x,y}} className="w-[200px] h-[100px] bg-white absolute">
        </div>
    );
}

export default FileManager;