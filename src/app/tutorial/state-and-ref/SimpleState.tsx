'use client'

import {useContext, useRef, useState} from "react";
import {BoxedDiv} from "@/app/tutorial/BoxedDiv";
import {CodeSpan, TextDiv} from "@/app/tutorial/TextDiv";
import styled from "styled-components";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";


const ElemDiv = styled.div`
    padding-top: 8px;
`

const SubComponent = () => {

    const renderCount = useRef(0);

    const [clickCount, setClickCount] = useState(0);

    renderCount.current += 1;
    console.log("rerender in sub component");

    return <BoxedDiv>
        <div>{"Rendered count in subcomponent: " + renderCount.current.toString()}</div>
        <ElemDiv>
            <TextDiv>
                Whenever we press the state button the state is updated, this causes a rerender.
                However parent components are not rerendered.
            </TextDiv>
            <button onClick={() => setClickCount(c => c + 1)}>
                {"state button in cubcomponent clicked: " + clickCount.toString()}
            </button>
        </ElemDiv>
    </BoxedDiv>
}



export const SimpleState = (props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);

    const renderCount = useRef(0);

    const [clickCount, setClickCount] = useState(0);
    const clickOnRef = useRef(0);

    renderCount.current += 1;
    console.log("rerender");

    return <BoxedDiv>
        <TextDiv>
            useState is the most simple and direct way to keep state of a an application.
            useState is useful whenever the state is directly accessed and not too complex. It is a very good starting
            point for development.<br/>
            The format of useState is <CodeSpan>const [state, setState] = useState(initialValue)</CodeSpan><br/>
            See <a href={"https://react.dev/reference/react/useState"} target={"_blank"}>react.dev</a> for more
            information.<br/>
            <br/>
            Typical uses here are the amount of times a button is pressed. Or which tutorial tab is visible.<br/>
            <br/>
            useRef is a way to store data between renders, but other than useState change it doesn't trigger
            rerendering.
            It should be used for values that have no influence on the render itself and are not directly visible.<br/>
            The format of useState is <CodeSpan>const ref = useRef(initialValue)</CodeSpan><br/>
            See <a href={"https://react.dev/reference/react/useRef"} target={"_blank"}>react.dev</a> for more
            information.<br/>
            <br/>
            Typical uses are keeping track of interval ids, for later clearing if desired<br/>
        </TextDiv>
        <hr/>
        <ElemDiv>{"Rendered count: " + renderCount.current.toString()}</ElemDiv>
        <ElemDiv>
            <TextDiv>
                Whenever we press the state button the state is updated, this causes a rerender.
                And also a rerender of the children
            </TextDiv>
            <button onClick={() => setClickCount(c => c + 1)}>
                {"state button clicked: " + clickCount.toString()}
            </button>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                Whenever we press the "ref" button there is no change is State. So no rerender occurs.
                The code isn't executed. We do not even see the counter directly growing, only after updating a state
                the change of this "ref count" becomes visible
            </TextDiv>
            <button onClick={() => clickOnRef.current += 1}>
                {"ref button clicked: " + clickOnRef.current.toString()}
            </button>
        </ElemDiv>
        {/* ADVANCED */}
        {advanced && <ElemDiv>
            <TextDiv>
                Whenever we press the no state update button we change the state to the same value it already was.
                The state is "changed", this causes the function to rerender. However at the drawing phase of the component rendering,
                react optimizer notices no state is actually *different*; which causes two things: rerender of child components is not called
                and the actual drawing of the virtual dom to the real dom is not called.
                In effect: the console log is shown (and internally the renderCount is updated) but this is not visible.
            </TextDiv>
            <button onClick={() => setClickCount(c => c)}>
                {"no state update button clicked: " + clickCount.toString()}
            </button>
        </ElemDiv>}
        {/* END-ADVANCED */}
        <SubComponent/>
    </BoxedDiv>
}