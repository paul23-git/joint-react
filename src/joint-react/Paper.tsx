import {ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {dia, shapes} from "@joint/core";
import {GraphContext} from "@/joint-react/graphContext";
import Graph = dia.Graph;
import {ElementContext, ElementDict} from "@/joint-react/ElementContext";

type PropTy = Omit<dia.Paper.Options, "el" | "model"> & {
    children?: ReactNode
    renderCount: number
}
export const Paper = (props: PropTy) => {
    const {children, renderCount} = props;
    const paperEl = useRef(null);
    const graph = useRef(new Graph({}, {cellNamespace: shapes}))

    const paper = useRef<dia.Paper|undefined>();
    const [elements, setElements] = useState<ElementDict>({})
    const value = {elements, setElements}
    console.log('rerender the paper ' + renderCount)
    const {

        // super
        theme,
        collection,
        id,
        attributes,
        className,
        tagName,
        events,
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
        overflow,
    } = props;

    useEffect(() => {
        if (graph.current) {
            paper.current = new dia.Paper({
                el: paperEl.current,
                model: graph.current,
                // super
                theme,
                collection,
                id,
                attributes,
                className,
                tagName,
                events,
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
                // elementView, FIXME
                // linkView,
                // embedding
                embeddingMode,
                frontParentOnly,
                findParentBy,
                validateEmbedding,
                validateUnembedding,
                // // default views, models & attributes
                cellViewNamespace,
                routerNamespace,
                connectorNamespace,
                highlighterNamespace,
                // anchorNamespace,
                // linkAnchorNamespace,
                // connectionPointNamespace,
                defaultLink,
                defaultRouter,
                // defaultConnector,
                // defaultAnchor,
                // defaultLinkAnchor,
                ///defaultConnectionPoint: undefined, // FIXME
                // defaultConnectionPoint,
                // // rendering
                async,
                sorting,
                frozen,
                autoFreeze,
                viewport,
                onViewUpdate,
                onViewPostponed,
                beforeRender,
                afterRender,
                overflow,
                // width: 300,
                // height: 300,
                // background: { color: '#F5F5F5' },
            });

            // //create elements
            // const rect1 = new shapes.standard.Rectangle();
            // rect1.position(25, 25);
            // rect1.resize(180, 50);
            // rect1.addTo(graph.current);
            //
            // const rect2 = new shapes.standard.Rectangle();
            // rect2.position(95, 225);
            // rect2.resize(180, 50);
            // rect2.addTo(graph.current);
            //
            //
            // rect1.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
            // rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
            //
            // rect1.attr('label', { text: 'Hello', fill: '#353535' });
            // rect2.attr('label', { text: 'World!', fill: '#353535' });
            //
            // const link = new shapes.standard.Link();
            // link.source(rect1);
            // link.target(rect2);
            // link.labels([{
            //     attrs: {
            //         text: {
            //             text: 'Hello, World!'
            //         }
            //     }
            // }]);
            //
            //
            // link.addTo(graph.current)
        }


        return () => {
            if (paper.current) {
                paper.current.stopListening();
                paper.current = undefined;
            }
        };
    }, [
        graph,
        // super
        theme,
        collection,
        id,
        attributes,
        className,
        tagName,
        events,
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
        overflow,
    ]);

    // useEffect(() => {
    //     console.log("use effect of paper " + renderCount)
    //     graph.current.clear()
    //     for (const elem of elements) {
    //         elem.addTo(graph.current);
    //     }
    // });
    // useLayoutEffect(() => {
    //     console.log("use layout effect of paper " + renderCount)
    //     graph.current.clear()
    //     for (const elem of elements) {
    //         elem.addTo(graph.current);
    //     }
    // });

    return (<>
        <div>{renderCount}</div>
        <GraphContext.Provider value={graph.current}>
            <ElementContext.Provider value={value}>
                <div ref={paperEl} />
                {children}
            </ElementContext.Provider>
        </GraphContext.Provider>
    </>);
}