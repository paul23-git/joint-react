import {useContext, useEffect} from "react";
import {GraphContext} from "@/joint-react/graphContext";
import {dia} from "@joint/core";

export type buildFunType<T> = (shapeProps: T) => dia.Cell | undefined

/**
 * Hook to manually make a new shape using hooks
 * Internally it uses useEffect to notice when data changes.
 * @param shapeProps Array with properties, to be committed
 * @param buildFunction Function to build the actual cell
 */
export function useJointShape<T extends any[]>(buildFunction: buildFunType<T>, shapeProps: T) {
    const graph = useContext(GraphContext);
    useEffect(() => {
        if (graph) {
            const newCell = buildFunction(shapeProps);
            console.log("Added cell ", newCell?.id, newCell?.isValid())
            newCell?.addTo(graph);

            return () => {
                console.log("remove cell ", newCell?.id);
                newCell?.remove();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graph, ...shapeProps])

}