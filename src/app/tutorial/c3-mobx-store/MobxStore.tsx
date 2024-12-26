/* eslint-disable react/no-unescaped-entities */
'use client'

import {useContext, useRef} from "react";
import {CodeSpan, ElemDiv, TextDiv} from "@/app/tutorial/Styled";
import {AdvancedCtx} from "@/app/tutorial/AdvancedContext";
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import {Todo} from "@/app/tutorial/c3-mobx-store/TodoStore";
import {BoxedDiv} from "@/app/tutorial/Styled";


export const MobxStore = observer((props: {tabKey: string | number}) => {
    const advanced = useContext(AdvancedCtx);
    const renderCount = useRef(0);
    const todoStoreRef = useRef(new Todo("Hello world"));
    const todoStore = todoStoreRef.current;

    renderCount.current += 1;

    function handleDirectToggle() {
        // Notice that this will lead to a warning.
        todoStore.finished = !todoStore.finished;
    }
    function handleRunInActionToggle() {
        // This works without warning
        runInAction(() => {
            todoStore.finished = !todoStore.finished;
        })
    }


    return <BoxedDiv>
        <TextDiv>
            Complex state quickly becomes too complex to keep rebuilding and updating. For this a statemanager is added.
            There are multiple (redux, mobx, zustand), generally they can be divided into two categories: flux design pattern and reactive stores.
            We use mobx, a reactive store pattern. You should read <a href={"https://mobx.js.org/"}>mobx homepage</a> for details.
            In this example we use a simple "TODO" to explain it.<br/>

            Notice that put the store itself in a reference, the store itself will not update nor cause rerenders,
            so all the rerenders happen by changes in the store itself.

        </TextDiv>
        <hr/>
        <ElemDiv>
            <TextDiv><b>
                {"Rerender count: " + renderCount.current.toString()}
            </b></TextDiv>
            <TextDiv>
                Mobx works with the idea of "observable state". Inside the store you define what parts are "observable", "computed" and "actions".
                Mobx will then make sure the component is rerendered when the observable changes. The text field below reads the title of the store
                And updates the field during the on change.
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
                Notice that directly changing a variable leads to a warning in the console terminal, we should use actions for this.
                Mobx provides a quick-and-dirty escape mechanism, called <CodeSpan>runInAction()</CodeSpan>
            </TextDiv>
            <div>
                <hr/>
                <div><b>Todo: </b>{todoStore.title}</div>
                <div><b>finished - warning: </b>
                    <input checked={todoStore.finished}
                           type={"checkbox"}
                           onChange={handleDirectToggle}/>
                </div>
                <div><b>finished - using runInAction: </b>
                    <input checked={todoStore.finished}
                           type={"checkbox"}
                           onChange={handleRunInActionToggle}/>
                </div>
                <hr/>
            </div>
        </ElemDiv>
        <ElemDiv>
            <TextDiv>
                Mobx also directly recognizes when you access an observable map
            </TextDiv>
            <div>
                <hr/>
                <div><b>Foo: </b>{todoStore.complex_count.get("foo") || 0}
                <button onClick={e => todoStore.increaseFooCount()}>Increase Foo count</button>
                </div>
                <div><b>Hello: </b>{todoStore.complex_count.get("hello") || 0}
                <button onClick={e => todoStore.increaseHelloCount()}>Increase Hello count</button>
                </div>
                <hr/>
            </div>
        </ElemDiv>
        {/* ADVANCED */}
        {advanced && <ElemDiv>
            <TextDiv>
                Async functions, or promises with callbacks <CodeSpan>then()</CodeSpan>, create a new event loop.
                Mobx cannot guarantee that this event loop doesn't run during the render step. Thus each of the
                functions there
                need to be ran inside an action themselves.<br/>
                There are two solutions for this: <br/>
                &nbsp;&nbsp;either run the part *after* the await as a separate action-function itself<br/>
                &nbsp;&nbsp;Or just call another action instead that directly changes the value
                in <CodeSpan>runInAction</CodeSpan>,
            </TextDiv>
            <div><b>finished - warning: </b>
                <input checked={todoStore.finished}
                       type={"checkbox"}
                       onChange={e => todoStore.delayedToggleNoRunInAction()}/>
            </div>
            <div><b>finished - using runInAction: </b>
                <input checked={todoStore.finished}
                       type={"checkbox"}
                       onChange={e => todoStore.delayedToggleRunInAction()}/>
            </div>
            <div><b>finished - using explicit action: </b>
                <input checked={todoStore.finished}
                       type={"checkbox"}
                       onChange={e => todoStore.delayedToggleSeparateAction()}/>
            </div>
        </ElemDiv>}
        {/* END-ADVANCED */}
    </BoxedDiv>
});