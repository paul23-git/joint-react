import {shapes} from "@joint/core";
import {
    Dispatch,
    forwardRef,
    SetStateAction,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";
import {dia} from "@joint/core/types/joint";

function randomInt(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

type RectProps = {
    x: number;
    y: number,
    width: number;
    height: number;
    callbackState: [dia.Element | undefined, Dispatch<SetStateAction<dia.Element | undefined>>]
}

export const Rect = function Rect(props: RectProps) {
    const graph = useContext(GraphContext);
    const {elements, setElements} = useContext(ElementContext);
    const {x, y, width, height, callbackState} = props;
    const [, setShape] = callbackState

    useEffect(() => {
        const rect = new shapes.standard.Rectangle();
        rect.position(x, y);
        rect.resize(width, height);
        rect.addTo(graph);
        setShape(rect);
        setElements(e => ({...e, [rect.id]: rect}))
        return () => {
            setShape(undefined);
            setElements((e) => {
                const {[rect.id]: _, ...remaining} = e;
                return remaining;
            })
            rect.remove();
        }
    }, [setShape, setElements, graph, x, y, width, height]);


    // useEffect(() => {
    //     console.log("made rect")
    //     const rect = new shapes.standard.Rectangle();
    //     rect.position(x, y);
    //     rect.resize(width, height);
    //
    //     shape.current = rect;
    // }, [graph, x, y, width, height])
    // if (shape.current) {
    //     elements.push(shape.current)
    // }

    return <></>
};