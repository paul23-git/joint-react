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
import CircleAttributes = shapes.standard.CircleAttributes;

type CircleProps = {
    id?: string | number,
    x: number,
    y: number,
    width: number,
    height: number,
    setLinkCallback?: Dispatch<SetStateAction<dia.Element | undefined>>,
    root?: SVGGElement,
    body?: SVGCircleElement,
    label?: SVGTextElement,
}

export const Circle = function Circle(props: CircleProps) {
    const { x, y, width, height, setLinkCallback, body, root, label, ...remaining} = props;

    useJointShape(() => {
        const circle = new shapes.standard.Circle(remaining);
        circle.position(x, y);
        circle.resize(width, height);
        //circle.attr('root/title', 'shapes.standard.Circle');
        //circle.attr('label/text', 'Circle');
        //circle.attr('body/fill', 'lightblue');
        setLinkCallback?.(circle);
        return circle;
    }, [setLinkCallback, x, y, width, height])



    return <></>
};


