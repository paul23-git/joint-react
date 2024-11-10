'use client'

import {GraphContext} from "@/joint-react/graphContext";
import {dia, shapes} from "@joint/core";
import Graph = dia.Graph;
import {useRef, useState} from "react";
import { Paper } from "@/joint-react/Paper";
import {Rect} from "@/joint-react/shapes/standard/Rect";
import {Link} from "@/joint-react/shapes/standard/Link";

export function JointReactDiv() {
    const [namespace, setNamespace] = useState(shapes);
    const [clickCount, setClickCount] = useState(1)
    const rect1 = useState<dia.Element | undefined>(undefined);
    const rect2 = useState<dia.Element | undefined>(undefined);


    return <div style={{width:'100%', border:"1px solid black"}}>
        here be the component down there
        <div>
            <button onClick={() => {
                setClickCount(c => c+1);
            }}>count + 1</button>
            {clickCount}
        </div>

        <div>
            <Paper width={300} height={300} background={{ color: '#F5F5B5' }} cellViewNamespace={namespace} renderCount={clickCount}>
                <Rect x={100} y={150} width={80} height={40} callbackState={rect1}/>
                <Rect x={100} y={210} width={80} height={40} callbackState={rect2}/>
                <Link source={rect1[0]} target={rect2[0]} />
            </Paper>
        </div>
    </div>
}