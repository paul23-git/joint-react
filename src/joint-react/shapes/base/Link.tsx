import {ReactNode, useContext, useEffect} from "react";

import {dia, shapes} from "@joint/core";
import LinkAttributes = shapes.standard.LinkAttributes;
import ConstructorOptions = dia.Cell.ConstructorOptions;
import {GraphContext} from "@/joint-react/graphContext";
import {ElementContext} from "@/joint-react/ElementContext";



type PropTy = LinkAttributes & {
    configOptions: ConstructorOptions
}


export function Link(props: PropTy) {
    const graph = useContext(GraphContext);
    const {elements, setElements} = useContext(ElementContext);
    const {source, target, options} = props;


    useEffect(() => {
        if (graph && source && target) {
            const link = new shapes.standard.Link({}, );
            // new dia.Link()

            // link.source(source);
            // link.target(target);
            link.addTo(graph);

            return () => {
                console.log("remove link");
                link.remove();
            }
        }
    }, [graph, source, target, elements])


    return <></>
}