import {Context, createContext, Dispatch, SetStateAction} from "react";
import {dia} from "@joint/core/types/joint";

export type ElementDict = {[key: dia.Cell.ID]: dia.Cell}


export const ElementContext: Context<{
    elements: ElementDict,
    setElements: Dispatch<SetStateAction<ElementDict>>,
}> = createContext({
    elements: {},
    setElements: (() => ({})) as Dispatch<SetStateAction<ElementDict>>,
})