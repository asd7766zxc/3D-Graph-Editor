import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    FloatingFocusManager,
    useId,
    useHover
  } from "@floating-ui/react";
import { useState } from "react";

function SelectorWindow({OnClick,...props}){
    const [isOpen, setIsOpen] = useState(false);
    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
    });
    
    const hover = useHover(context);
    
    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
    ]);
    return(
        <div ref={refs.setReference}>
            
        </div>
    )
};
export default SelectorWindow;