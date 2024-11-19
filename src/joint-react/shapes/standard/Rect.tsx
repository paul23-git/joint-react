import {shapes} from "@joint/core";
import {
    Dispatch,
    SetStateAction, useContext, useEffect,
} from "react";
import {dia} from "@joint/core/types/joint";
import {useJointShape} from "@/joint-react/shapes/useJointShape";
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";
import RectangleAttributes = shapes.standard.RectangleAttributes;

type RectProps = RectangleAttributes & {
    id?: string | number,
    x: number,
    y: number,
    width: number,
    height: number,
    setLinkCallback?: Dispatch<SetStateAction<dia.Element | undefined>>,
}

export const Rect = function Rect(props: RectProps) {
    const { x, y, width, height, setLinkCallback, ...remaining} = props;

    useJointShape(() => {
        const rect = new shapes.standard.Rectangle(remaining);
        rect.position(x, y);
        rect.resize(width, height);
        setLinkCallback?.(rect);
        return rect;
    }, [setLinkCallback, x, y, width, height])


    // const graph = useContext(GraphContext);
    // const {elements, setElements} = useContext(ElementContext);
    // useEffect(() => {
    //     const rect = new shapes.standard.Rectangle();
    //     rect.position(x, y);
    //     rect.resize(width, height);
    //     rect.addTo(graph);
    //     setLinkCallback?.(rect);
    //     setElements(e => ({...e, [rect.id]: rect}))
    //     return () => {
    //         setLinkCallback?.(undefined);
    //         setElements((e) => {
    //             const {[rect.id]: _, ...remaining} = e;
    //             return remaining;
    //         })
    //         rect.remove();
    //     }
    // }, [setShape, setElements, graph, x, y, width, height]);


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