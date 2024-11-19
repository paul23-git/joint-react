import {ReactNode, useContext, useEffect} from "react";

import {dia, shapes} from "@joint/core";
import LinkAttributes = shapes.standard.LinkAttributes;
import ConstructorOptions = dia.Cell.ConstructorOptions;
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";
import {useJointShape} from "@/joint-react/shapes/useJointShape";



type PropTy = LinkAttributes & {
    configOptions: ConstructorOptions
}


export function Link(props: PropTy) {
    const {source, target, options} = props;
    useJointShape(([source, target]) => {
        if (source && target) {
            const link = new dia.Link({}, );
            link.source(source);
            link.target(target);
            return link
        } else {
            return undefined;
        }
    }, [source, target]);


    // const graph = useContext(GraphContext);
    // const {elements, setElements} = useContext(ElementContext);
    // useEffect(() => {
    //     if (graph && source && target) {
    //         const link = new dia.Link({}, );
    //         // new dia.Link()
    //
    //         // link.source(source);
    //         // link.target(target);
    //         link.addTo(graph);
    //
    //         return () => {
    //             console.log("remove link");
    //             link.remove();
    //         }
    //     }
    // }, [graph, source, target])


    return <></>
}