import {shapes} from "@joint/core";
import {
    Dispatch,
    SetStateAction, useContext, useEffect,
} from "react";
import {attributes, dia} from "@joint/core/types/joint";
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
    root?: attributes.SVGAttributes,
    body?: attributes.SVGCircleAttributes,
    label?: attributes.SVGTextAttributes,
    setLinkCallback?: Dispatch<SetStateAction<dia.Element | undefined>>,
}

export const Rect = function Rect(props: RectProps) {
    const { x, y, width, height, setLinkCallback, root, body, label} = props;

    useJointShape(() => {
        const attrs = {
            root, body, label
        }
        const rect = new shapes.standard.Rectangle({attrs});
        rect.position(x, y);
        rect.resize(width, height);
        setLinkCallback?.(rect);
        return rect;
    }, [setLinkCallback, x, y, width, height, root, body, label]);

    return <></>
};