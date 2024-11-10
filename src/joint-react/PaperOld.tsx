import {useContext, useEffect, useRef} from "react";
import {dia, shapes} from "@joint/core";
import {GraphContext} from "@/joint-react/graphContext";



type PropTy = Omit<dia.Paper.Options, "el" | "model">


// const namespace = {
//     ...shapes, Node
// }

// export function PaperOld(props: PropTy) {
//     const {cellNamespace} = props;
//     const paperEl = useRef(null);
//     const paper = useRef<dia.PaperOld|undefined>();
//     const graph = useContext(GraphContext);
//
//     useEffect(() => {
//         paper.current = new dia.PaperOld({
//             model: graph,
//             el: paperEl,
//             cellViewNamespace: props.cellViewNamespace,
//             width: 300,
//             height: 300,
//         });
//     })
//
//
//     return <div ref={paperEl}/>
//
// }

class Node extends dia.Element {
defaults() {
return {
...super.defaults,
type: "Node",
//...
};
}
//...
}

export const PaperOld = (props: PropTy) => {
const paperEl = useRef(null);
const graph = useRef<any>();
const paper = useRef<any>();
const {
// appearance
width,
height,
drawGrid,
drawGridSize,
background,
labelsLayer,
// interactions
gridSize,
highlighting,
interactive,
snapLabels,
snapLinks,
snapLinksSelf,
markAvailable,
// validations
validateMagnet,
validateConnection,
restrictTranslate,
multiLinks,
linkPinning,
allowLink,
// events
guard,
preventContextMenu,
preventDefaultViewAction,
preventDefaultBlankAction,
clickThreshold,
moveThreshold,
magnetThreshold,
// views
elementView,
linkView,
// embedding
embeddingMode,
frontParentOnly,
findParentBy,
validateEmbedding,
validateUnembedding,
// default views, models & attributes
cellViewNamespace,
routerNamespace,
connectorNamespace,
highlighterNamespace,
anchorNamespace,
linkAnchorNamespace,
connectionPointNamespace,
defaultLink,
defaultRouter,
defaultConnector,
defaultAnchor,
defaultLinkAnchor,
defaultConnectionPoint,
// connecting
connectionStrategy,
// rendering
async,
sorting,
frozen,
autoFreeze,
viewport,
onViewUpdate,
onViewPostponed,
beforeRender,
afterRender,
overflow
} = props;

useEffect(() => {
const cellNamespace = {
Node,
//...
};

graph.current = new dia.Graph({}, { cellNamespace });
paper.current = new dia.Paper({
model: graph.current,
el: paperEl.current,
cellViewNamespace: cellNamespace,
width: props.width,
height: 300,
background: { color: '#F5F5F5' },

});

return () => {
paper.current.stopListening();
};
}, []);

return (
<div ref={paperEl} />
);
}