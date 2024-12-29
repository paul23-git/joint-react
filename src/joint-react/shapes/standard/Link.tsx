import {cloneElement, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useEffect, useState, isValidElement} from "react";
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";
import {dia, shapes} from "@joint/core";
import LinkAttributes = shapes.standard.LinkAttributes;
import ConstructorOptions = dia.Cell.ConstructorOptions;
import {useJointShape} from "@/joint-react/shapes/useJointShape";
import EndJSON = dia.Link.EndJSON;



type PropTy = LinkAttributes & {
    configOptions?: ConstructorOptions,
    source: EndJSON,
    target: EndJSON,

}

export function useLink(source: EndJSON, target: EndJSON, linkProps: LinkAttributes, configOptions?: ConstructorOptions ) {
    useJointShape(() => {
        const sourceOrigin = source;
        const targetOrigin = target;
        const {attrs, ...startProps} = linkProps;
        const link = new shapes.standard.Link(startProps, configOptions);
        link.source(sourceOrigin);
        link.target(targetOrigin);
        if (attrs) {
            for (const [key, val] of Object.entries(attrs)) {
                link.attr(key, val);
            }
        }
        return link
    }, [source, target, JSON.stringify(linkProps), JSON.stringify(configOptions)]);
}


export function Link(props: PropTy) {
    const {source, target, configOptions, ...linkProps} = props;

    useLink(source, target, linkProps, configOptions);

    return <>
    </>
}
