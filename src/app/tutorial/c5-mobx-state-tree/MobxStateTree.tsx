/* eslint-disable react/no-unescaped-entities */
'use client'

import {useContext, useRef} from "react";
import {CodeSpan, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {observer} from "mobx-react-lite";
import {Todo} from "@/app/tutorial/c5-mobx-state-tree/TodoStore";
import {BoxedDiv} from "@/app/tutorial/Styled";


export const MobxStateTree = observer((props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);
    const renderCount = useRef(0);
    const todoStoreRef = useRef(Todo.create({
        title: "hello world",
    }));
    const todoStore = todoStoreRef.current;

    renderCount.current += 1;


    return <BoxedDiv>
        <TextDiv>
            Mobx allows for a lot of freedom in how stores are generated and maintained. However this can lead to code all over the place. <br/>
            Mobx state tree (MST) is a strongly opiniated layer over mobx itself. It uses the same technology but makes mobx behave like mvc.<br/>
            <br/>
            MST has as central pillar a single "state tree", where all the stores belong to.
            Furthermore it also enforces correct typing at runtime.
            Finally it prevents unwanted updating of state without actions, by making those proper errors. <br/>
            <br/>
            This comes at the cost of performance though.
        </TextDiv>
        <hr/>
        <ElemDiv>
            <TextDiv><b>
                {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                MST has a very strict and clear layout of actions data that can be shown, however usage is very similar to mobx.
            </TextDiv>
            <div>
                <hr/>
                <div><b>Todo: </b>{todoStore.title}</div>
                <div><b>finished: </b>
                    <input checked={todoStore.finished}
                           type={"checkbox"}
                           onChange={e => todoStore.toggle()}/>
                </div>
                <hr/>
            </div>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                Mobx state tree also directly recognizes when you access an observable map,
                working similarly with the same advantages as a normal mobx store.
            </TextDiv>
            <div>
                <hr/>
                <div><b>Foo: </b>{todoStore.complexCount.get("foo") || 0}
                <button onClick={e => todoStore.increaseFooCount()}>Increase Foo count</button>
                </div>
                <div><b>Hello: </b>{todoStore.complexCount.get("hello") || 0}
                <button onClick={e => todoStore.increaseHelloCount()}>Increase Hello count</button>
                </div>
                <hr/>
            </div>
        </ElemDiv>
        {/* ADVANCED */}
        {advanced && <ElemDiv>
            <TextDiv>
                Async functions, or promises with callbacks <CodeSpan>then()</CodeSpan>, create a new event loop.
                MST cannot guarantee that this event loop doesn't run during the render step. Thus each of the
                functions there needs to be ran inside an action themselves.<br/>
                For MST we are limited to the single solution: <br/>
                &nbsp;&nbsp;Just call another action instead that directly changes the value. <br/>
                &nbsp;&nbsp;Notice that these two actions need to be in a separate <CodeSpan>action</CodeSpan> statement.
            </TextDiv>
            <div><b>finished - error: </b>
                <input checked={todoStore.finished}
                       type={"checkbox"}
                       onChange={e => todoStore.delayedToggleNoRunInAction()}/>
            </div>
            <div><b>finished - using another action: </b>
                <input checked={todoStore.finished}
                       type={"checkbox"}
                       onChange={e => todoStore.delayedToggle()}/>
            </div>
        </ElemDiv>}
        {/* END-ADVANCED */}
    </BoxedDiv>
});