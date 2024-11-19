import {cloneElement, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useEffect, useState, isValidElement} from "react";
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";
import {dia, shapes} from "@joint/core";
import LinkAttributes = shapes.standard.LinkAttributes;
import ConstructorOptions = dia.Cell.ConstructorOptions;
import {useJointShape} from "@/joint-react/shapes/useJointShape";
import EndJSON = dia.Link.EndJSON;



type PropTy<T extends { setLinkCallback?: Dispatch<SetStateAction<dia.Element | undefined>> }> = LinkAttributes & {
    configOptions?: ConstructorOptions,
    source: ReactElement<T> | EndJSON,
    target: ReactElement<T> | EndJSON,
}

function useLink(source: EndJSON | undefined, target: EndJSON | undefined, attributes: LinkAttributes, opt?: ConstructorOptions ) {
    useJointShape(([sourceElement, targetElement]) => {
        if (sourceElement && targetElement) {
            const link = new shapes.standard.Link(attributes, opt);
            link.source(sourceElement);
            link.target(targetElement);
            return link
        } else {
            return undefined;
        }
    }, [source, target, JSON.stringify(attributes), JSON.stringify(opt)]);
}


export function Link<T extends { setLinkCallback?: Dispatch<SetStateAction<dia.Element | undefined>> }>(props: PropTy<T>) {
    // const graph = useContext(GraphContext);
    // const {elements, setElements} = useContext(ElementContext);
    const {source, target, configOptions, ...linkProps} = props;
    const [sourceElement, setSourceElement] = useState<EndJSON | undefined>(undefined);
    const [targetElement, setTargetElement] = useState<EndJSON | undefined>(undefined);

    useLink(sourceElement, targetElement, linkProps, configOptions);
    useJointShape(([sourceElement, targetElement]) => {
        const sourceOrigin = isValidElement(source) ? sourceElement : source;
        const targetOrigin = isValidElement(target) ? targetElement : target;
        if (sourceOrigin && targetOrigin) {
            const link = new shapes.standard.Link(linkProps, configOptions);
            link.source(sourceOrigin);
            link.target(targetOrigin);
            return link
        } else {
            return undefined;
        }
    }, [sourceElement, targetElement, source, target, JSON.stringify(linkProps), JSON.stringify(configOptions)]);


    // @ts-ignore
    const enhancedSource = isValidElement(source) ? cloneElement(source, { setLinkCallback: setSourceElement }) : <></>;
    // @ts-ignore
    const enhancedTarget = isValidElement(target) ? cloneElement(target, { setLinkCallback: setTargetElement })  : <></>;


    return <>
        {enhancedSource}
        {enhancedTarget}
    </>
}
