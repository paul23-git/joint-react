/* eslint-disable react/no-unescaped-entities */
'use client'

import {ChangeEvent, useContext, useRef, useState} from "react";
import {BoxedDiv, CodeSpan, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {
    Level1InBetween,
    SubComponent
} from "@/app/tutorial/c7-state-drilling-and-context/SubComponentContext";
import {SimpleTextualContext} from "@/app/tutorial/c7-state-drilling-and-context/SimpleTextualContext";


export const StateDrillingAndContext = (props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);

    const renderCount = useRef(0);

    const [inputValue, setInputValue] = useState("type here");

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }
    return <BoxedDiv>
        <TextDiv>
            While there are many advanced store systems. useState still has a major role in react. However one problem always
            exists around react: if you have many levels of indirection, and the state is defined in a higher level, You have to
            pass the state through all intermediate components.<br/>
            While the problem seems manageable in small systems, in larger applications prop drilling can explode into unreadable mess.<br/>

            For this react has a build in mechanic Context. <a href={"https://react.dev/reference/react/useContext"}>See react manual</a>. The structure of a context is:
            <ul>
                <li>Create the contex somewhere in another file <CodeSpan>createContext()</CodeSpan>.
                    Here you should give it a default value. The context should be CamelCase</li>
                <li>Initialize a context barrier using <CodeSpan>&lt;ContextName.Provider&gt;</CodeSpan> component.
                    In the higher component, where you know the actual value</li>
                <li>Where you use it you can access the value by using <CodeSpan>value = useContext(ContextName)</CodeSpan></li>
            </ul>

            In this application a typical usecase is "AdvancedCtx", where we provide the whole application with the state of the "advanced" checkbox.<br/>
            For this tutorial we often wrap things in <CodeSpan>&lt;impleTextualContext.Provider&gt;</CodeSpan>.
            Normally you would just wrap the whole component, however for clarity we used it multiple times here.<br/>
            <br/>
            Ideal places are things that are not changed directly - best example the mobx/mst store variables themselves! <br/>
            Or things that can change, but interact (near) globally (ie the user login, or the internationalization).

        </TextDiv>
        <hr/>
        <ElemDiv>{"Rendered count: " + renderCount.current.toString()}</ElemDiv>
        <ElemDiv>
            <input value={inputValue} onChange={onChange}/>
            <TextDiv>
                Below you can see an example where we wrap the inputValue inside a simple context. Notice that we do not
                have to provide anything directly to the subcomponent.
            </TextDiv>
            <SubComponent/>
            <SimpleTextualContext.Provider value={inputValue}>
                <SubComponent/>
            </SimpleTextualContext.Provider>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                This even works with multiple levels where the direct usage is not visible.
            </TextDiv>
            <SimpleTextualContext.Provider value={inputValue}>
                <Level1InBetween/>
            </SimpleTextualContext.Provider>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                Compare the syntax for the top one (using context) to the bottom one (using the state).
            </TextDiv>
            <SimpleTextualContext.Provider value={inputValue}>
                <Level1InBetween/>
            </SimpleTextualContext.Provider>
        </ElemDiv>
        {/* ADVANCED */}
        {advanced && <>
            <ElemDiv>
                <TextDiv>
                    There is no built in way that typescript can know/guarantee that a context will only be called "under"
                    a <CodeSpan>&lt;Context.Provider&gt;</CodeSpan> component. <b>Not doing so is considered an anti pattern though</b><br/>
                    For this reason the actual definition of the context also needs to provide a default value, and if we cannot provide a default
                    the type needs to be extended with <CodeSpan>undefined</CodeSpan> or <CodeSpan>null</CodeSpan>. If undefined/null is used, when
                    using the context we obviously should also guard against that while using the context, however by the advantage is a strongly typed system.
                    Where the type system actively prevents mistakes.
                </TextDiv>
                <SubComponent/>
            </ElemDiv>
            <ElemDiv>
                <TextDiv>
                    While the examples show simple single values that are passed down, obviously anything can go.
                    Most importantly are the mobx/mst stores themselves, this is the suggested way by the mobx developers themselves:<br/>
                    One would create the root store/mobx stores in a top level component, and then create a context containing this store.
                    For mobx it is advisable to create a context for each store, while in MST each tree should have a single context.<br/>
                    <br/>

                    Another trick is to sometimes provide both the actually value and the setter for a state into the context.
                    Many i18n libraries do this, to help set settings from different places in the application.<br/>
                    Do this sparingly though as it effectively makes a mutable global state (albeit testable and better scalable than real globals).
                </TextDiv>
            </ElemDiv>
        </>}
        {/* END-ADVANCED */}
    </BoxedDiv>
}