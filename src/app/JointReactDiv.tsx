'use client'

import {GraphContext} from "@/joint-react/graphContext";
import {dia, shapes} from "@joint/core";
import Graph = dia.Graph;
import {useEffect, useRef, useState} from "react";
import { Paper } from "@/joint-react/Paper";
import {Rect} from "@/joint-react/shapes/standard/Rect";
import {Link} from "@/joint-react/shapes/standard/Link";
import {Link as BaseLink} from "@/joint-react/shapes/base/Link";

function SubComponent(props: any) {
    const {width, height, renderCount} = props;
    useEffect(() => {
        console.log("Heavy computation, ran for ", width * height);
    }, [width, height])
    return <div>{renderCount * 10}</div>
}

export function JointReactDiv2() {
    const [namespace, setNamespace] = useState(shapes);
    const [clickCount, setClickCount] = useState(1)
    return <div style={{width: '100%', border: "1px solid black"}}>
        <div>
            <button onClick={() => {
                setClickCount(c => c + 1);
            }}>count + 1
            </button>
            {clickCount}
        </div>
        <div>
            <SubComponent width={480} height={480} background={{ color: '#F5F5B5' }} cellViewNamespace={namespace} renderCount={clickCount}/>
        </div>
    </div>
}

export function JointReactDiv() {
    const [namespace, setNamespace] = useState(shapes);
    const [clickCount, setClickCount] = useState(1)

    const background = useRef({ color: '#F5F5B5' })



    return <div style={{width:'100%', border:"1px solid black"}}>
        here be the component down there
        <div>
            <button onClick={() => {
                setClickCount(c => c+1);
            }}>count + 1</button>
            {clickCount}
        </div>

        <div>
            <Paper width={480} height={480} background={background.current} cellViewNamespace={namespace} renderCount={clickCount}>
                <Rect x={0} y={0} width={80} height={40} />
                <Rect id="middlepoint"  x={clickCount*10} y={230} width={80} height={40} />
                <Rect id={"source"} x={100} y={100} width={80} height={40} />
                <Link
                    source={{id: "source"}}
                    target={{id: "middlepoint"}}
                    labels={[{
                        attrs: {
                            text: {
                                text: "hello world",
                            }
                        }
                    }]}
                    attrs={{
                        // @ts-ignore
                        'line/strokeWidth': 20
                    }}
                />
            </Paper>
        </div>
    </div>
}