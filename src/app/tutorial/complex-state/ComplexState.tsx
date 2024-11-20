'use client'

import {useContext, useRef, useState} from "react";
import {BoxedDiv} from "@/app/tutorial/BoxedDiv";
import {CodeSpan, TextDiv} from "@/app/tutorial/TextDiv";
import styled from "styled-components";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";


const ElemDiv = styled.div`
    padding-top: 8px;
`




export const ComplexState = (props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);


    const [complexState, setComplexState] = useState({
        initial_a: 0,
        initial_b: 0,
    });
    const [clickCount, setClickCount] = useState(0);
    const [whichButton, setWhichButton] = useState("None");

    function handleBadClick() {
        setComplexState(oldState => {
            oldState.initial_a += 1;
            return oldState;
        })
    }

    function handleGoodClick() {
        setComplexState(oldState => {
            const cloned_state = {...oldState};
            cloned_state.initial_b += 1;
            return cloned_state;
        })
    }

    return <BoxedDiv>
        <TextDiv>
            State is compared using the <CodeSpan>Object.is()</CodeSpan> function, very similar to how <CodeSpan>===</CodeSpan> works. This compares if the "identity" is equal between objects.
            Ignoring the contest. This has two effects: whenever you give a new object as state it will be considered a new object and cause redrawing
            But more importantly this means that if you change the insides of a state it doesn't cause a rerender. As can be seen below:
        </TextDiv>
        <hr/>
        <ElemDiv>
            <TextDiv>
                This example shows the bad way to update state, if we just change the insides of the state and return that in the the setState function.
                The object is still refers to the same number. react then doesn't see that the state has changed.
            </TextDiv>
            <button onClick={handleBadClick}>
                {"state button clicked: " + complexState.initial_a.toString()}
            </button>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                The proper way to handle complex states is to make a clone of said state first, then modify that clone and return this clone.
                This is why state is called "immutable" in react, and is the reducer pattern that is all around react architecture.
            </TextDiv>
            <button onClick={handleGoodClick}>
                {"ref button clicked: " + complexState.initial_b.toString()}
            </button>
        </ElemDiv>
        {/* ADVANCED */}
        {advanced && <>
            <ElemDiv>
                <TextDiv>
                    You should not worry about performance in this regard. This is such a basic feature of react, and javascript as a whole,
                    That all engines have spent a lot of time improving performance of this. Most engines recognize that a variable is no longer being used or immutable.
                    This allows them to optimize paths (no actual copy, when not needed). And keep the application state coherent
                </TextDiv>
            </ElemDiv>
            <hr/>
            <ElemDiv>
                <TextDiv>
                    So far we have always used a <CodeSpan>set</CodeSpan> function that is given an updater function.
                    However for most states it
                    is often clearer to set the state directly as below (notice the event is still a handler, but the setWhichButton is given directly a value):
                </TextDiv>
                <div>{"Which button is last clicked: " + whichButton}</div>
                <button onClick={() => setWhichButton("left")}>left</button>
                <button onClick={() => setWhichButton("right")}>right</button>
            </ElemDiv>
            <ElemDiv>
                <TextDiv>
                    However when state is based on previous state this leads to complications: because the state is only *actually* updated
                    during the next render it when using the previous state it will not update below. Below calls setClickCount twice, in the hopes of increasing it by two
                </TextDiv>
                <div>{"our count: " + clickCount}</div>
                <button onClick={() => {
                    setClickCount(clickCount + 1); // has old click count!
                    setClickCount(clickCount + 1); // has same count as above!
                }}>Trying to update count by two!</button>
            </ElemDiv>
            <ElemDiv>
                <TextDiv>
                    This is especially visible in asynchronous functions (ie after a promise to get data from server, or a timeout).
                    In the example below we try to increase the click count 0.5 second after being clicks. <br/>
                    However if you click multiple times within one second, the count won't be improved as expected, as all those functions
                    Still have the old count.<br/>
                    Try clicking multiple times!
                </TextDiv>
                <div>{"our count: " + clickCount}</div>
                <button onClick={() => {
                    setTimeout(() => {
                        setClickCount(clickCount + 1); // has old click count!
                    }, 500)
                }}>Updating the count with a delay of 500ms</button>
            </ElemDiv>
            <ElemDiv>
                <TextDiv>
                    The solution is to use the updater-function variant of the set
                    function. <br/><CodeSpan>{"(prevState) => { return newState;}"}</CodeSpan>
                    this is shown below, again by using a delayed clicker with setTimeout. <br/>
                    A rule of thumb is that whenever you depend on a previous state, always use this format. And
                    whenever you depend on multiple states, either combine them in one object.
                    Or use one the other features (stores, or useReducer)<br/>
                    Try clicking multiple times!
                </TextDiv>
                <div>{"our count: " + clickCount}</div>
                <button onClick={() => {
                    setTimeout(() => {
                        setClickCount(prevCount => {return prevCount + 1}); // has old click count!
                    }, 500)
                }}>Updating the count with a delay of 500ms, now working</button>
            </ElemDiv>
        </>}
        {/* END-ADVANCED */}
    </BoxedDiv>
}